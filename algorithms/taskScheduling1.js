function task_scheduler()
{
  var task=document.getElementById("i1").value;
  var task_arr=[];
  for(var i=0;i<task;i++)
  {
    var a=prompt("enter task "+(i+1));
    task_arr.push(a);
  }
  document.write("tasks: "+task_arr+"<br>");

  var deadline=[];
  for(i=0;i<task;i++)
  {
    var b=parseInt(prompt("enter deadline in minutes for task "+(i+1)));
    deadline.push(b);
  }
  document.write("deadline for completion in minutes: "+deadline+"<br>");

  var time_required=[];
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


        var temp3=deadline[j];
        deadline[j]=deadline[j+1];
        deadline[j+1]=temp3;
      }
    }
  }
  document.write("time required in sorted order: "+time_required+"<br>"+"tasks in sorted order: "+task_arr+"<br>"+"deadline in sorted order: "+deadline+"<br>");
  var time_alot=2;
  document.write("optimised time for completion is: "+optimisation(time_alot,time_required,deadline,task_arr));
}

function optimisation(time_alot,time_required,deadline,task_arr)
{

  var optimised=[];
  var opt;
  for(var i=0;i<time_required.length;i++)
  {
    //document.write(time_required[i]+"<br>"+deadline+"<br>");
    if(time_required[i]<=time_alot && time_required[i]<=deadline[i])
    {
      var t=0;
      optimised.push(t);
      //time_alot=time_alot+(time_alot-time_required[i]);
      //break;
      //return time_alot;
    }
    // else if(time_required[i]>time_alot && time_required[i]<=deadline[i])
    // {
    //   opt=deadline-time_required[i];
      //time_required[i]=time_required[i]-time_alot;
      // optimised.push(time_required[i]);
      //return optimisation(time_alot,time_required,deadline,task_arr);
    //}
    else {
      opt=time_required[i]-deadline[i];
      optimised.push(opt);

      //return optimisation(time_alot,time_required,deadline,task_arr);
      time_required[i]=time_required[i]-time_alot;
      // while(time_required[i]>deadline[i])
      // {
      //   for(var j=i+1;j<deadline.length;j++)
      //   {
      //     if(time_required[j]<=time_alot)
      //     {
      //       document.write("switching to task "+task_arr[j]);
      //       optimised.push(0);
      //     }
      //   }
      // }

    }
   }
   return optimised;
}
