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
  document.write(time_required+"<br>"+task_arr+"<br>"+deadline+"<br>");
var time_alot=2;
document.write(optimisation(time_alot,time_required,deadline,task_arr));
}

function optimisation(time_alot,time_required,deadline,task_arr)
{
  var optimised=[];
  for(i=0;i<time_required.length;i++)
  {
    if(time_required[i]<=time_alot && time_required<=deadline[i])
    {
      var t=0;
      optimised.push(t);
      time_alot=time_alot+(time_alot-time_required[i]);
      break;
    }
    else if(time_required[i]<=time_alot && time_required>deadline)
    {
      time_alot=time_alot+(time_alot-time_required[i]);
      optimisation(time_alot,time_required,deadline,task_arr);
    }
    else {
      time_required[i]=time_required[i]-time_alot;
      optimisation(time_alot,time_required,deadline,task_arr);
    }
  }
  return optimised;
}
