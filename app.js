const defaultStaff = [

    "Dr.Kuan",
    "Dr.Ma",
    "Dr.Meekay",
    "Dr.Tin",
    "Dr.Kim",
    "Ping",
    "Wing",
    "Amy",
    "Xiu",
    "Wendy",
    "Joanne",
    "Tony",
    "Vila"

];


let staff = JSON.parse(localStorage.getItem("staff"))
|| defaultStaff;



let schedule = JSON.parse(localStorage.getItem("schedule"))
|| {};



let currentDate = new Date();



const staffList =
document.getElementById("staffList");


const calendar =
document.getElementById("calendar");



const monthSelect =
document.getElementById("monthSelect");


const yearSelect =
document.getElementById("yearSelect");





function saveData(){

    localStorage.setItem(
        "staff",
        JSON.stringify(staff)
    );


    localStorage.setItem(
        "schedule",
        JSON.stringify(schedule)
    );

}





function loadStaff(){


    staffList.innerHTML="";


    staff.forEach(person=>{


        let div=document.createElement("div");


        div.className="staff";

        div.innerText=person;


        div.draggable=true;



        div.addEventListener(
            "dragstart",
            e=>{

                e.dataTransfer.setData(
                    "staff",
                    person
                );

            }
        );


        staffList.appendChild(div);


    });


}






function setupSelectors(){


    const months=[
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];



    months.forEach((m,i)=>{


        let option=document.createElement("option");

        option.value=i;

        option.textContent=m;

        monthSelect.appendChild(option);


    });




    for(let y=2020;y<=2035;y++){


        let option=document.createElement("option");

        option.value=y;

        option.textContent=y;

        yearSelect.appendChild(option);


    }



    monthSelect.onchange=()=>{

        currentDate.setMonth(
            monthSelect.value
        );

        renderCalendar();

    };



    yearSelect.onchange=()=>{


        currentDate.setFullYear(
            yearSelect.value
        );


        renderCalendar();


    };


}







function renderCalendar(){


    calendar.innerHTML="";



    monthSelect.value =
    currentDate.getMonth();


    yearSelect.value =
    currentDate.getFullYear();




    const days=[
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat"
    ];



    days.forEach(day=>{


        let header=document.createElement("div");

        header.className="weekday";

        header.innerText=day;

        calendar.appendChild(header);


    });




    let year=currentDate.getFullYear();

    let month=currentDate.getMonth();



    let firstDay =
    new Date(
        year,
        month,
        1
    ).getDay();



    let totalDays =
    new Date(
        year,
        month+1,
        0
    ).getDate();





    for(let i=0;i<firstDay;i++){

        calendar.appendChild(
            document.createElement("div")
        );

    }





    for(let day=1;day<=totalDays;day++){


        let box=document.createElement("div");


        box.className="day";


        let key =
        `${year}-${month+1}-${day}`;



        box.innerHTML =
        `<div class="date-number">
            ${day}
        </div>`;





        if(schedule[key]){


            schedule[key].forEach(item=>{


                let div=document.createElement("div");


                div.className =
                item.type==="staff"
                ?
                "staff-event"
                :
                "note-event";



                div.innerText=item.text;


                box.appendChild(div);


            });


        }







        box.ondragover=e=>{

            e.preventDefault();

        };




        box.ondrop=e=>{


            let person =
            e.dataTransfer.getData(
                "staff"
            );


            if(!schedule[key])
                schedule[key]=[];



            schedule[key].push({

                type:"staff",

                text:person

            });



            saveData();

            renderCalendar();


        };







        box.oncontextmenu=e=>{


            e.preventDefault();



            let note =
            prompt(
                "Add note:"
            );



            if(note){


                if(!schedule[key])
                    schedule[key]=[];



                schedule[key].push({

                    type:"note",

                    text:note

                });



                saveData();

                renderCalendar();


            }


        };



        calendar.appendChild(box);


    }



}







document
.getElementById("addStaffBtn")
.onclick=()=>{


    let name =
    prompt(
        "New staff name:"
    );



    if(name){


        staff.push(name);


        saveData();


        loadStaff();


    }


};






document
.getElementById("prevMonth")
.onclick=()=>{


    currentDate.setMonth(
        currentDate.getMonth()-1
    );


    renderCalendar();


};





document
.getElementById("nextMonth")
.onclick=()=>{


    currentDate.setMonth(
        currentDate.getMonth()+1
    );


    renderCalendar();


};





setupSelectors();

loadStaff();

renderCalendar();