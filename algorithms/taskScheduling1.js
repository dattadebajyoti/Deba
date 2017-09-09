//function to read in all the inputs
function task_scheduler()
{
  var task=document.getElementById("i1").value;
  var task_arr=[];
  //taking the task name from user
  for(var i=0;i<task;i++)
  {
    var a=prompt("enter task "+(i+1));
    task_arr.push(a);
  }
  document.write("--------------------Task Scheduler--------------------"+"<br>"+"tasks: "+task_arr+"<br>");

  var time_required=[];
  //taking input for total time to complete from the user
  for(i=0;i<task;i++)
  {
    var c=parseInt(prompt("enter total time required in minutes for task: "+(i+1)));
    time_required.push(c);
  }
  document.write("Time required for completion in minutes: "+time_required+"<br>");

  for(i=0;i<time_required.length-1;i++)
  {
    for(var j=0;j<time_required.length-i-1;j++)
    {
      if(time_required[j]>time_required[j+1])
      {
        var temp1=time_required[j];
        time_required[j]=time_required[j+1];
        time_required[j+1]=temp1;

        var temp2=task_arr[j];
        task_arr[j]=task_arr[j+1];
        task_arr[j+1]=temp2;
      }
    }
  }
  //assumed the time quantum to be 2
  var time_alot=2;
  document.write("time allotted for a task at a given instant is assumed to be 2 minutes"+"<br>");
  document.write("the sorted order of task with respect to time is: "+task_arr+"<br>");
  document.write("<br>"+"optimised extra time for "+task_arr+" is: "+optimisation(time_alot,time_required,task_arr)+"<br>");
}

//function to optimise the tasks
function optimisation(time_alot,time_required,task_arr)
{

  var optimised=[];
  //var opt;
  var arrayInitialise=[];
  for(var j=0;j<time_required.length;j++)
     optimised[j]=0;
  document.write("initial value for optimised time for all process is assumed as :"+optimised+"<br>");
  document.write("**************Processing**************"+"<br>");
  for(j=0;j<time_required.length;j++)
  {

        for(var i=0;i<time_required.length;i++)
        {
          if(arrayInitialise[i]!=0)
          {
           document.write("Scheduling task for: "+task_arr[i]+"<br>");
           //checking if the time to complete is < time quantum
           if(time_required[i]<=time_alot)
           {
             document.write("Task completed for "+task_arr[i]+"<br>"+"<br>");
             document.write("___________________________________"+"<br>");
             arrayInitialise[i]=0;
            // break;
           }
           //finding the total time more for completion
           else {
             time_required[i]=time_required[i]-time_alot;
             document.write("Time require for task: "+task_arr[i]+" to finish is "+time_required[i]+"<br>");
             arrayInitialise[i]=1;
             optimised[i]=optimised[i]+2;
           }
          }

         }

         //document.write(optimised[i]);
  }
   return optimised;
}
