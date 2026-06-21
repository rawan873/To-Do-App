let tasks =
    JSON.parse(localStorage.getItem("tasks")) || [];

let editIndex = null;

let btn = document.querySelector('button');
btn.addEventListener('click', function (e) {
    e.preventDefault();
    addTask();
});
let celebrate = true

function addTask() {
    let taskinput = document.getElementById('task-name');
    let text = taskinput.value.trim();
    if (text) {
        if (editIndex != null) {
            tasks[editIndex].text = text;
            editIndex = null;
            updatetasklist()
            taskinput.value = "";
        } else {
            tasks.push({ text, completed: false })
            taskinput.value = "";
            updatetasklist()
        }
    }
}
function updatetasklist() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    let taskslist = document.getElementById('tasks')
    taskslist.innerHTML = ""
    tasks.forEach((task, index) => {
        let listitem = document.createElement('li')
        listitem.classList.add('list-item');

        listitem.innerHTML = `
        <div class='listli '  data-index='${index}'>
    <div class='liname'>
   <input class="checkbtn" type='checkbox'   ${task.completed ? "checked" : ""}>
<span style="
text-decoration:${task.completed ? 'line-through' : 'none'}
">
    ${task.text}
</span> 
  </div>
    <div>
    <img src='./edit.png'  onclick='edittask(${index})'>
    <img src='./bin.png' onclick='deltask(${index})'>
   </div>
   </div>

`
        taskslist.append(listitem)
        const checkbox = listitem.querySelector('.checkbtn');

        checkbox.addEventListener('change', () => {
            toggleTask(index);
        });
    })
    stats()
}
function toggleTask(index) {
    tasks[index].completed =
        !tasks[index].completed;

    updatetasklist();
}
function stats() {
    let taskscompleted = tasks.filter(task => task.completed).length;

    document.getElementById('number').innerHTML = `${taskscompleted}/${tasks.length}`

    let bar = document.getElementById('progressbar')
    let progress =
        tasks.length === 0
            ? 0
            : (taskscompleted / tasks.length) * 100; bar.style.width = `${progress}%`;


    if (taskscompleted !== tasks.length) {
        celebrate = true;
    }

    if (
        tasks.length > 0 &&
        taskscompleted === tasks.length &&
        celebrate
    ) {
        blast();
        celebrate = false;
    }
}

function edittask(index) {
    let textinput = document.getElementById('task-name');
    textinput.value = tasks[index].text;
    editIndex = index;

    console.log(index);
    // celebrate = false
}
function deltask(index) {
    tasks.splice(index, 1)
    updatetasklist();
    // celebrate = false
}
updatetasklist();

function blast() {
    console.log("blast fired");

    const count = 200,
        defaults = { origin: { y: .7 } };

    function fire(particleRatio, opts) {
        confetti(Object.assign({}, defaults, opts, { particleCount: Math.floor(count * particleRatio) }));
    }
    fire(.25, {
        spread: 26,
        startVelocity: 55
    });
    fire(.2, { spread: 60 });
    fire(.35, {
        spread: 100,
        decay: .91,
        scalar: .8
    });
    fire(.1, {
        spread: 120,
        startVelocity: 25,
        decay: .92,
        scalar: 1.2
    });
    fire(.1, {
        spread: 120,
        startVelocity: 45
    });
}