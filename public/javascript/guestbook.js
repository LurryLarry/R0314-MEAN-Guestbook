$(document).ready(function() {
  $.getJSON("/api/data.json", function(result) {
    console.log(typeof result);

    let data = result;
    console.log(typeof result);

    console.log(data.length);
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
        "</td></tr>";
    }

    table += "</tbody></table>";
    console.log(table);

    var output = document.getElementById("tableresult");

    output.innerHTML = table;
  });
});
