
displayGCCs().then(
    function (gccsArray)
    {

        for (let i=0; i<gccsArray.length; i++)
        {
            let row = document.getElementById("gccList").insertRow(i);

            let numberCellGcc = row.insertCell(0);
            let idCell = row.insertCell(1);
            let titleCell = row.insertCell(2);
            let descriptionCell = row.insertCell(3);

            numberCellGcc.innerHTML= i+1;
            idCell.innerHTML = gccsArray[i].fidicGCCId;
            titleCell.innerHTML = gccsArray[i].fidicGCCTitle;
            descriptionCell.innerHTML = gccsArray[i].fidicGCCDescription;

        }
    },
    function (error)
    {
        alert(error);
    });

async function displayGCCs()
{
    const projectUrl = 'http://127.0.0.1:8080/api/fidicgcc/getAll';

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    window.console.log(projectData);
    return projectData;
}

async function createGCC()
{
    const jsonGCC = {
        "fidicGCCId": "", "fidicGCCTitle": "", "fidicGCCDescription": ""
    };

    jsonGCC.fidicGCCId = document.forms["gccForm"]["gccId"].value;
    if (jsonGCC.fidicGCCId == "")
    {
        return false;
    }

    jsonGCC.fidicGCCTitle = document.forms["gccForm"]["gccTitle"].value;
    if (jsonGCC.fidicGCCTitle == "")
    {
        return false;
    }

    jsonGCC.fidicGCCDescription = document.forms["gccForm"]["gccDescription"].value;
    if (jsonGCC.fidicGCCDescription == 0)
    {
        return false;
    }


    const url = 'http://localhost:8080/api/fidicgcc/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-Allow-Origin': 'http://localhost:8080"'
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(jsonGCC) // body data type must match "Content-Type" header
    };

    const response1 = await fetch(url, options);
    let dataResponse1 = response1.json();
    dataResponse1.then(
        function (results)
        {
            alert(results);
           // window.location.reload();
            //window.console.log(results);
            window.location.assign("../html/fidicPCC.html");
        },
        function (error)
        {
            alert(error);
        }
    );

}