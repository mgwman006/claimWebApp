
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
    const projectUrl = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/fidicgcc/getAll';

    let projectOptions = {
        mode: 'cors',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    };
    const projectResponse = await fetch(projectUrl, projectOptions);
    let projectData = projectResponse.json();
    return projectData;
}

async function createGCC()
{
    const jsonGCC = {
        "fidicGCCId": "", "fidicGCCTitle": "", "fidicGCCDescription": ""
    };

    jsonGCC.fidicGCCId = document.getElementById("floatingGCCId").value;
    if (jsonGCC.fidicGCCId == "")
    {
        alert("GCCId is NULL");
        return false;
    }

    jsonGCC.fidicGCCTitle = document.getElementById("floatingGCCTitle").value;
    if (jsonGCC.fidicGCCTitle == "")
    {
        alert("GCC Title is NULL");
        return false;
    }

    jsonGCC.fidicGCCDescription = document.getElementById("floatingGCCDescription").value;
    if (jsonGCC.fidicGCCDescription == "")
    {
        alert("GCC Description is NULL");
        return false;
    }


    const url = 'http://claimapi-env-1.eba-jymfddee.af-south-1.elasticbeanstalk.com/api/fidicgcc/saveUpdate';
    let options = {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
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
           window.location.reload();

        },
        function (error)
        {
            alert(error);
        }
    );

}