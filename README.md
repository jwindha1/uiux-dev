Architecture:

 - The component's state
    - label: the chosen label of "all", "school", "work", "personal" to 
      filter by
    - minHrs, maxHrs: the inclusive endpoints of the filter for a task's
      number of hours, null if there is no specified endpoint 
    - sortBy: the chosen type of sorting, either from quickest to most 
      time-intensive or the other way around
    - options: a list of tasks which have not been picked as tasks to 
      complete now -- this is the list which can be filtered and sorted, 
      and it is initialized with all the tasks
    - chosen: a list of tasks which have been picked out of the options 
      list and which will be aggregated by number of hours 

 - A task's fields
    - id: unique int, necessary to keep track of items when filtered
    - img: URL to task image
    - name: description of task
    - hours: number of hours required to complete that task
    - label: the type of task, one of {"school", "work", "personal"}
    - loc: the location where the task will be completed (serves no 
      direct purpose in the filtering/sorting/aggregation)


 - render: a flexbox of two items (the "Task Options" and "My Tasks" 
   sections)
    
    - The "Task Options" section is rendered with allFilters and by 
      sorting (with sortOptions), filtering (with filterOptions), and 
      calling buildTask on the list of options and organizing the results
      in a flexbox
       
       - allFilters: this helper creates the min and max hours filters 
         with hrsFilter, then adds the label filter and sorting by time 
         with select dropdown elements which update the label and sortBy
         fields in the component's state when changed
          
          - hrsFilter: this helper contains an input element for numbers 
            which will update either the minHrs or maxHrs fields of the 
            component's state when updated, and a reset button which will
            nullify the minHrs or maxHrs fields of the component's state 
            when pressed
       
       - buildTask: this helper creates a task item by loading the task's 
         fields and styling them depending on whether it's for the "Task
         Options" or "My Tasks" section, then adds a button which will 
         move the task between the options and chosen lists (fields in 
         the component's state) when pressed
       
       - sortOptions: this helper returns a number which indicates how to 
         sort elements based on whether it's positive or negative, using 
         the value sortBy in the component's state

       - filterOptions: this helper returns a boolean describing whether 
         or not a certain task meets the filtering criteria (number of
         hours, label)
    
    - The "My Tasks" section is rendered with calling buildTask on the 
      chosen list and aggregating hours for this list with a reduce


A note for grading:

 - This app was built with one component, using helper functions to reduce 
   redundancy. I believe it works well as one component since the helpers 
   make it clear, readable, and extendable, but I only saw right before it
   was due that there was an implicit requirement to use multiple 
   components, which my app does not do. The handout does not say this 
   explicitly, so I hope that my work can still be graded based on code
   cleanliness and effective structure despite not meeting this implicit 
   standard. Thanks!