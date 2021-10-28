# Project Brief

Create a simple time tracking app using react JS and a GraphQL endpoint. The application will present the user with the ability to,

1) Select a task (select box)
2) Click a button to start and stop the timer.
3) Display the details of tracked time entries against a task.

---
# Before you Start

    Visit www.proworkflow.com and sign up for a free trial.  
     - For 'Company Name'  enter "Dev Test" + [your first name]
     - e.g. DEVTESTjonathan
    
     Please ensure you follow this naming convention to ensure you are granted access to GraphQL Enpoint as described below
    
   
   > ---
   > ## "DEVTESTjonathan" is referred as your 'workspace' 
   > ---

- Familiarize yourself with how to track time within the current tool.
- Reach out to our support team via live chat or support@proworkflow.com
- Explain you are completing the development test and ask them to provide the API Key of the trial you have just created.

### GraphQL Endpoint
The public graphql endpoint is https://graph.proworkflow.com/[workspace]

-	Add the header below to authenticate 
```
{ "Authorization":"YOUR-API-KEY"}
``` 
-	You can explore or write test queries at https://graph.proworkflow.com/[workspace]/explorer/
-	add the Authorization in the HTTP Headers section (bottom left) of the explorer Graphql tool
- you can run queries from queries.gql in this 'explorer' to view the results, or write your own
- the query below will return all active tasks (no filtering)
 ```
{
    tasks{
        id 
        name 
        timerecords{
            id 
            timespent
        }
    }
}  
```

# Time Tracking Test Tasks

## Select Task
- Allow the user to select a task they wish to track time against from the GET_TASKS graphql query results.
- The application should display the currently selected task.
- Once a task has been selected, the user should be presented with a “Start Timer Button” and a list of previously recorded time entries. (explained below)

## Start Timer (Button)
-	The user should be presented with a button to “Start Timer”, this will fire the START_TIMERECORD mutation.  
-	A timer should be shown showing how long the current timer has been running (format HH:mm)

## Stop Timer (Button)
-	The stop timer button will fire the STOP_TIMERECORD mutation. 
-	An option to add ‘notes’ should be given when the user clicks ‘stop timer’ button
-	If no notes are added, the app should supply the project name and task name as notes to the mutation.

## Time Entries Display:
-	Below the Start/Stop timer button, a display of previous time records that have been tracked against the task should be shown, this data can be found from the GET_TASK query.
-	This should be updated once a new time record has been stopped with newest time entries at the top.

### Timer Entry Details to Display
-   Notes
-	Start date
-	Start time
-	Stop time
-	Time tracked (HH:mm)
-   Tracked by (contact full name)

---
# Additional Instructions 
- The graphql Query and Mutations are supplied in queries.gql file in this repo
- You are welcome to make use of any component libraries such as Material UI
- You are free to make any UX decisions which may aid in the usability of this time tracking application. 
- Code structure, Component Libraries, UX and Design decisions are likely to be discussion points during the interview so prepare for discussions about these choices.

## Additional Tasks (OPTIONAL) - see extended_queries.gql
-	Extend "Select Task" to give the user the ability to filter/search for specific tasks by providing a search parameter to FILTER_TASKS query
-	Allow user to edit time entry notes in Time Entries list
