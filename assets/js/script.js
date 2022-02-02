var taskObj={
    key:"projects",
    addProject: function(){
        // if project id selected
if( document.getElementById("add-project").value ==""){
    swal("Please enter project name");
    return false;
}
//initialize local storage
var option="";
if(localStorage.getItem(this.key) == null){
    localStorage.setItem(this.key,"[]");
}
var data = json.parse(localStorage.getItem(this.key));

var project={
    id: data.length,
    name: document.getElementById("add-project").value,
    tasks:[]
};
// project push in local Storage
data.push(project);
localStorage.setItem(this.key, json.stringify(data));

this.loadAllProjects();
this.showAllProjects();

    },
};

//get all stored projects
getAllProjects: function store(){
    if(localStorage.getItem(this.key)==null){
        localStorage.setItem(this.key,"[]");
    }
    return json.parse(localStorage.getItem(this.key))
}
loadAllProjects:function load(){
    var projects = taskObj.getAllProjects();
    projects= projects.reverse();
    var html ="<option value=''>Select Project</option>";
    for(var a=0; a< projects.length; a++){
        html +="<option value='"+projects[a].id+"'>"+projects[a].name+"</option>";
    
    }
    document.getElementById("add-task-project").innerHtml= html;
document.getElementById("form-task-hour-calculator-all-projects").innerHTML=html;
}

//show all task
window.addEventListener("load",function(){
    taskObj.loadAllProjects();
    taskObj.showAllTasks();
});

//add task
addTask: 
   function task (){
    var project= form.project.value;
    var task=form.task.value;

    var projects= this. getAllProjects();
    var task = form.task.value;
    var projects= this.getAllProjects();
    for (var a=0; a< projects.length; a++){
        if (projects[a].id == project){
            var taskObj={
                id: projetcs[a].tasks.length,
                name: task,
                status: "Progress",// progress, Completed
                isStarted: false,
                logs:[],
                started: this.getCurrentTimeInTaskStartEndFormat(),
                ended:""
            }
            projects[a].tasks.push(taskObj);
            break;
        }
    }

    //update localStorage
localStorage.detItem(this.key,json.stringify(projects));
jQuery("#addTaskModal").modal("hide");
jQuery9(".modal-backdrop").remove();
this.showAllTasks();
return false;
};
//get time and date
getCurrentTimeInTaskStartEndFormat();{
    let current_datetime = new Date();
    var date = current_datetime.getDate();
    date = (date < 10) ? "0" + date : date;
    var month = (current_datetime.getMonth() + 1);
    month = (month < 10) ? "0" + month : month;
    var hours = current_datetime.getHours();
    hours = (hours < 10) ? "0" + hours : hours;
    var minutes = current_datetime.getMinutes();
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    var seconds = current_datatime.getSeconds();
    seconds = (seconds<10)?"0" + seconds : seconds;
    let formatted_date = current_datetime.getFullYear() + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return formatted_date;
};

// show all tasks in table
showAllTasks: function showAllTasks () {
    var html = "";
 
    // get all projects
    var projects = this.getAllProjects();
    for (var a = 0; a < projects.length; a++) {
        projects[a].tasks = projects[a].tasks.reverse();
 
        // get tasks in each project
        for (var b = 0; b < projects[a].tasks.length; b++) {
            html += "<tr>";
                html += "<td>" + projects[a].tasks[b].name + "</td>";
                html += "<td>" + projects[a].name + "</td>";
                if (projects[a].tasks[b].isStarted) {
                    html += "<td><label class='started'>Started</label></td>";
                } else {
                    if (projects[a].tasks[b].status == "Completed") {
                        html += "<td><label class='completed'>" + projects[a].tasks[b].status + "</label></td>";
                    } else {
                        html += "<td>" + projects[a].tasks[b].status + "</td>";
                    }
                }
 
                // get total duration of each task using it's logs
                var duration = 0;
                for (var c = 0; c < projects[a].tasks[b].logs.length; c++) {
                    var log = projects[a].tasks[b].logs[c];
                    if (log.endTime > 0) {
                        duration += log.endTime - log.startTime;
                    }
                }
 
                // convert millisecond into hours, minutes and seconds
                duration = Math.abs((duration / 1000).toFixed(0));
                var hours = Math.floor(duration / 3600) % 24;
                hours = (hours < 10) ? "0" + hours : hours;
                // var days = Math.floor(diff / 86400);
                var minutes = Math.floor(duration / 60) % 60;
                minutes = (minutes < 10) ? "0" + minutes : minutes;
                var seconds = duration % 60;
                seconds = (seconds < 10) ? "0" + seconds : seconds;
 
                // show timer if task is already started
                if (projects[a].tasks[b].isStarted) {
                    var dataStartedObj = {
                        "duration": duration,
                        "project": projects[a].id,
                        "task": projects[a].tasks[b].id
                    };
                    html += "<td data-started='" + JSON.stringify(dataStartedObj) + "'>" + hours + ":" + minutes + ":" + seconds + "</td>";
                } else {
                    html += "<td>" + hours + ":" + minutes + ":" + seconds + "</td>";
                }
 
                // show task duration if completed
                if (projects[a].tasks[b].status == "Completed") {
                    html += "<td>" + projects[a].tasks[b].started + "<br><span style='margin-left: 30px;'>to</span><br>" + projects[a].tasks[b].ended + "</td>";
                } else {
                    html += "<td>" + projects[a].tasks[b].started + "</td>";
                }
 
                // form to change task status
                html += "<td>";
                    html += "<form method='POST' id='form-change-task-status-" + projects[a].id + projects[a].tasks[b].id + "'>";
                        html += "<input type='hidden' name='project' value='" + projects[a].id + "'>";
                        html += "<input type='hidden' name='task' value='" + projects[a].tasks[b].id + "'>";
                        html += "<select class='form-control' name='status' onchange='taskObj.changeTaskStatus(this);' data-form-id='form-change-task-status-" + projects[a].id + projects[a].tasks[b].id + "'>";
                            html += "<option value=''>Change status</option>";
                            if (projects[a].tasks[b].isStarted) {
                                html += "<option value='stop'>Stop</option>";
                            } else {
                                html += "<option value='start'>Start</option>";
                            }
                            if (projects[a].tasks[b].status == "Progress") {
                                html += "<option value='complete'>Mark as Completed</option>";
                            } else {
                                html += "<option value='progress'>Make in Progress Again</option>";
                            }
                            html += "<option value='delete'>Delete</option>";
                        html += "</select>";
                    html += "</form>";
                html += "</td>";
            html += "</tr>";
        }
    }
    document.getElementById("all-tasks").innerHTML = html;
};

// change task status
changeTaskStatus: function status(self) {
 
    // if task is not selected
    if (self.value == "") {
        return;
    }
 
    // loop through all projects
    var formId = self.getAttribute("data-form-id");
    var form = document.getElementById(formId);
    var projects = this.getAllProjects();
    for (var a = 0; a < projects.length; a++) {
 
        // if project matches
        if (projects[a].id == form.project.value) {
 
            // loop through all tasks of that project
            for (var b = 0; b < projects[a].tasks.length; b++) {
 
                // if task matches
                if (projects[a].tasks[b].id == form.task.value) {
 
                    // if the status is set to delete
                    if (self.value == "delete") {
 
                        // ask for confirmation
                        swal({
                            title: "Are you sure?",
                            text: "Deleting the task will delete its hours too.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((willDelete) => {
                            if (willDelete) {
 
                                // remove task from array
                                projects[a].tasks.splice(b, 1);
 
                                // update local storage
                                localStorage.setItem(this.key, JSON.stringify(projects));
 
                                // re-load all tasks
                                this.showAllTasks();
                            } else {
 
                                // reset dropdown
                                self.value = "";
                            }
                        });
                    } else if (self.value == "complete") {
                        // mark as completed
                        projects[a].tasks[b].status = "Completed";
 
                        // stop the timer
                        projects[a].tasks[b].isStarted = false;
 
                        // log end time
                        projects[a].tasks[b].ended = this.getCurrentTimeInTaskStartEndFormat();
                        for (var c = 0; c < projects[a].tasks[b].logs.length; c++) {
                            if (projects[a].tasks[b].logs[c].endTime == 0) {
                                projects[a].tasks[b].logs[c].endTime = new Date().getTime();
                                break;
                            }
                        }
                    } else if (self.value == "progress") {
                        // mark as in progress
                        projects[a].tasks[b].status = "Progress";
 
                        // stop the timer
                        projects[a].tasks[b].isStarted = false;
                    } else if (self.value == "start") {
                        // ask for confirmation
                        swal({
                            title: "Are you sure?",
                            text: "This will start the timer.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((doStart) => {
                            if (doStart) {
                                 
                                // mark as started
                                projects[a].tasks[b].isStarted = true;
 
                                // add in log
                                var logObj = {
                                    id: projects[a].tasks[b].logs.length,
                                    startTime: new Date().getTime(),
                                    endTime: 0
                                };
                                projects[a].tasks[b].logs.push(logObj);
 
                                // update local storage
                                localStorage.setItem(this.key, JSON.stringify(projects));
 
                                // re-load all tasks
                                this.showAllTasks();
                            } else {
 
                                // reset dropdown
                                self.value = "";
                            }
                        });
                    } else if (self.value == "stop") {
 
                        // ask for confirmation
                        swal({
                            title: "Are you sure?",
                            text: "This will stop the timer.",
                            icon: "warning",
                            buttons: true,
                            dangerMode: true,
                        })
                        .then((doStop) => {
                            if (doStop) {
 
                                // mark as stopped
                                projects[a].tasks[b].isStarted = false;
 
                                // update end time in log
                                for (var c = 0; c < projects[a].tasks[b].logs.length; c++) {
                                    if (projects[a].tasks[b].logs[c].endTime == 0) {
                                        projects[a].tasks[b].logs[c].endTime = new Date().getTime();
                                        break;
                                    }
                                }
 
                                // update local storage
                                localStorage.setItem(this.key, JSON.stringify(projects));
 
                                // re-load tasks
                                this.showAllTasks();
                            } else {
 
                                // reset dropdown
                                self.value = "";
                            }
                        });
                    }
                    break;
                }
            }
            break;
        }
    }
 
    if (self.value == "delete"
        || self.value == "start"
        || self.value == "stop") {
        //
    } else {
        localStorage.setItem(this.key, JSON.stringify(projects));
        this.showAllTasks();
    }
};

// call this function each second
setInterval(function () {
 
    // increment 1 second in all running tasks
    var dataStarted = document.querySelectorAll("td[data-started]");
    for (var i = 0; i < dataStarted.length; i++) {
        var dataStartedObj = dataStarted[i].getAttribute("data-started");
        var dataStartedObj = JSON.parse(dataStartedObj);
        dataStartedObj.duration++;
 
        var hours = Math.floor(dataStartedObj.duration / 3600) % 24;
        hours = (hours < 10) ? "0" + hours : hours;
        var minutes = Math.floor(dataStartedObj.duration / 60) % 60;
        minutes = (minutes < 10) ? "0" + minutes : minutes;
        var seconds = dataStartedObj.duration % 60;
        seconds = (seconds < 10) ? "0" + seconds : seconds;
        dataStarted[i].innerHTML = hours + ":" + minutes + ":" + seconds;
 
        // update log end time
        var projects = taskObj.getAllProjects();
        for (var a = 0; a < projects.length; a++) {
            if (projects[a].id == dataStartedObj.project) {
                for (var b = 0; b < projects[a].tasks.length; b++) {
                    if (projects[a].tasks[b].id == dataStartedObj.task) {
                        for (var c = 0; c < projects[a].tasks[b].logs.length; c++) {
                            if (c == projects[a].tasks[b].logs.length - 1) {
                                projects[a].tasks[b].logs[c].endTime = new Date().getTime();
                                window.localStorage.setItem(taskObj.key, JSON.stringify(projects));
                                dataStarted[i].setAttribute("data-started", JSON.stringify(dataStartedObj));
 
                                break;
                            }
                        }
                        break;
                    }
                }
                break;
            }
        }
    }
}, 1000);

//delete project
deleteProject: function del(self){
if(self.project.value==""){
    swal("Select a Project to delete");
    return false;
}
//conformation
swal({
    title:"Are you sure?",
    text:"Deleting the project will delete its tasks too.",
    icon:"warning",
    buttons: true,
    dangerMode: true,
})
.then((willDelete)=>{
    if(willDelete){
        var projects=taskObj.getAllProjects();
        for (var a=0;a< projects.length;a++){
            projects.splice.setItem(taskObj.key, json.stringify(projects));
            taskObj.loadAllProjects();
            taskObj.showAllTasks();
            break;
        }
    }
else{self.project.value=";"}
});
return false;
}