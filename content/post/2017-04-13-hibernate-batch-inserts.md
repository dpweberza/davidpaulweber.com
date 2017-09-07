+++
date = "2017-04-13T20:10:59+00:00"
tags = ["SOLIDitech", "Java", "Hibernate", "Scalability"]
title = "Hibernate Batch Inserts"
+++


The other day I was building our new orders interface in VueJS and I came across a performance problem on large orders where we were creating a large number of Hibernate objects in one request. For 750 objects the request was taking around 2 minutes. This was certainly unacceptable as the whole reason I was building a new orders interface was to scale better and provide a better UX.

So I started looking at options to do a batch insert instead, unfortunately we are stuck on Hibernate 2 at the moment due to a rather large code base that cannot be easily upgraded.

I checked for any small jdbc libs but was surprised I couldn't find anything decent.

Back at square one I was left with stock jdbc and prepared statements. Writing manual sql statements felt icky and I wanted a more generic solution.

Luckily I figured out how to get Hibernate to generate the prepared statement for me, couple that with some jdbc code and I rolled out a neat util to batch insert any object we had mapped.

I'll share the code for this utility below, I was happy that I managed to shave that 2 minute request down to 4 seconds with this tool.

Note the following detail / limitations:

1. Each batch must contain only one type of hibernate entity. We might add support for multiple entities if the need arises, we would just cache the meta data and sql for each type when iterating through the batch objects.
2. In one case I needed to batch insert a bunch of parent entities, then batch insert a child for each parent using the parents' ids, so to do this I pass a connection in, insert the parents in one batch, iterate through the parents and create a new child using the parent's identifier then batch insert the children and close the connection.

<pre class="language-java line-numbers"><code>/**
 * Inserts a List of DataBeans in one batch and sets the ids on the objects.
 * @param objects
 * @param connection - make sure you connection.close your own connection once done.
 * @throws Exception
 */
public void insertObjectsInOneBatch(LinkedList<? extends DataBean> objects, Connection connection) throws Exception
{
	if (objects.isEmpty())
		throw new Exception("objects argument is empty!");

	DataBean sampleObject = objects.get(0);

	ClassMetadata hibernateMetadata = HibernateManager.getSessionFactory().getClassMetadata(sampleObject.getClass());
	if (hibernateMetadata == null)
		throw new Exception("Failed to load hibernate metadata for class: " + sampleObject.getClassName() + ".\\nP.S. This wont work with lazy-loaded builds.");

	AbstractEntityPersister persister = (AbstractEntityPersister) hibernateMetadata;
	String[] columnNames = persister.getPropertyNames();
	Field sqlInsertString = ReflectionUtil.getField("sqlInsertString", persister);
	String sql = (String) sqlInsertString.get(persister);

	PreparedStatement ps = null;
	try
	{
		connection.setAutoCommit(false);
		ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);

		int count = 0;
		for (DataBean object : objects)
		{
			for (int i = 0; i < columnNames.length; i++)
			{
				String columnName = columnNames[i];
				Object propertyValue = persister.getPropertyValue(object, columnName);
				ps.setObject(i + 1, propertyValue);
			}
			ps.setObject(columnNames.length + 1, null); // Set id to null
			ps.addBatch();

			if (++count % batchSize == 0)
				ps.executeBatch();
		}

		ps.executeBatch();
		ResultSet rs = ps.getGeneratedKeys();

		// Set the inserted ids on the objects
		int i = 0;
		while (rs.next())
		{
			long id = rs.getLong(1);
			ReflectionUtil.setField(objects.get(i), "id", id);
			i++;
		}
	}
	catch (Exception ex)
	{
		LogManager.error(this, ex);
		throw ex;
	}
	finally
	{
		if (ps != null)
			ps.close();
	}
}</code></pre>