+++
date = "2017-09-06"
tags = ["SOLIDitech", "Java", "Design Pattern"]
title = "Design Patterns: Chain of Responsibility - A case study"
+++

## Preamble
In an effort to contribute more to my blog and help jog my memory, I have decided to start a series of blogs detailing some popular design patterns and how I have used them.

## Chain of Responsiblilty
The Chain of Responsibility pattern is defined as follows:
<blockquote>"Gives more than one object an opportunity to handle a request by linking receiving objects together" - Gang of Four book on Design Patterns</blockquote>

James Sugrue has an excellent overview of this pattern on [DZone - Chain of Responsibility Pattern Tutorial with Java Examples](https://dzone.com/articles/design-patterns-uncovered-chain-of-responsibility).


## Case Study
Back in 2014 I redesigned the main navigation menu for SOLIDitech's business automation platform called SOLID.

**Old Navigation**
{{< figure src="/static/img/solid-old-menu.png" class="thumb" >}}

**New Navigation**
{{< figure src="/static/img/solid-new-menu.png" class="thumb" >}}

While the new design certainly brought the user interface into the modern era and the filterable module dropdown vastly improved usability, there was one more feature I wanted to add.

### Quick Search
#### Design
I wanted to add a quick search bar for common entities in the system such as customers and orders.
I knew we would want to add new search capabilities down the line and that each customer may want different search capabilities.
So I came up with the plug-in design below which implements the Chain of Responsibility pattern.

{{< figure src="/static/img/quick-search-uml.png" >}}

This works as follows: 

1. On the frontend I utilised the Select2 jQuery library to provide the search input and make the ajax call to the search servlet.
  1. Each registered search plugin provides a search hint to the user, which is usually to use a prefix to search for a specific entity type.
2. The search servlet then passes the request to the *QuickSearch* class which has a cached list of search plugins. 
3. Each plugin is asked if the user is authorised *IQuickSearchPlugin.isAdminAuthorised(AdminSession)* to search it's content
4. If a user is authorised to use the search plugin, the plugin is then asked if the search term is relevant *IQuickSearchPlugin.isSearchTermRelevant(String)*
5. If the search term is relevant to the plugin, i.e. the search term starts with an "X" for the *QuickSearchOrdersPlugin* then the plugin performs the search and returns a list of *QuickSearchResult* objects.
6. After all the plugins have been processed the final list of results are serialised as json and sent back to the frontend.
7. The user can then select a search result to navigate to either in the current window or in a new tab.

#### Preview
{{< figure src="/static/img/quick-search-animation.gif" >}}