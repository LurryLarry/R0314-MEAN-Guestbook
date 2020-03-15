window.onload = () => {
    $('button').on('click', function(e) {
        e.preventDefault();



        var url = "/api/data.json";
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                let data = JSON.parse(xmlhttp.responseText);
                let table = `<table align="center" class="pure-table pure-table-horizontal" >
    <thead>
        <tr>
            <th>#</th>
            <th>Name</th>
            <th>Country</th>
            <th>Message</th>
            <th>Date</th>
        </tr>
    </thead><tbody>`;

                for (let i = 0; i < data.length; i++) {
                    table +=
                        "<tr><td style='font-weight: bold;'>" +
                        data[i].id +
                        "</td><td>" +
                        data[i].username +
                        "</td><td>" +
                        data[i].country +
                        "</td><td>" +
                        data[i].message +
                        "</td><td>" +
                        data[i].date +
                        "</td>";
                }

                table += "</tbody></table>";
                console.log(table);

                var output = document.getElementById("table");



                output.innerHTML = table;

                let name = document.getElementById("name").value;
                let country = document.getElementById("country").value;
                let message = document.getElementById("comment").value;

                $.post({
                    async: true,
                    type: "POST",
                    url: "/update-with-ajax",
                    dataType: "json",
                    data: {
                        "name": name,
                        "country": country,
                        "message": message
                    }
                });
            }
        };
    });
};