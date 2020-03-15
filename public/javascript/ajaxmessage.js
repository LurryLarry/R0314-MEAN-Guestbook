$(document).ready(function() {
    $('button').on('click', function(e) {
        e.preventDefault();
        let name = document.getElementById("name").value;
        let country = document.getElementById("country").value;
        let message = document.getElementById("comment").value;

        $.post({
            async: false,
            type: "POST",
            url: "/update-with-ajax",
            dataType: "json",
            data: {
                "name": name,
                "country": country,
                "message": message
            }
        });


        $.getJSON("/api/data.json", function(result) {
            let data = result;
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

            let output = document.getElementById("table");



            output.innerHTML = table;


        });
    });

});