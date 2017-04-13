+++
date = "2017-04-13T20:10:59+00:00"
draft = true
title = "Hibernate Batch Inserts"

+++


The other day I was building our new orders interface in VueJS and I came across a performance problem on large orders where we were creating a large number of Hibernate objects in one request. For 750 objects the request was taking around 2 minutes. This was certainly unacceptable as the whole reason I was building a new orders interface was to scale better and provide a better UX.

So I started looking at options to do a batch insert instead, unfortunately we are stuck on Hibernate 2 at the moment due to a rather large code base that cannot be easily upgraded.

I checked for any small jdbc libs but was surprised I couldn't find anything decent.

Back at square one I was left with stock jdbc and prepared statements. Writing manual sql statements felt icky and I wanted a more generic solution.

Luckily I figured out how to get Hibernate to generate the prepared statement for me, couple that with some jdbc code and I rolled out a neat util to batch insert any object we had mapped.

I'll share the code for this utility below, I was happy that I managed to shave that 2 minute request down to 4 seconds with this tool.