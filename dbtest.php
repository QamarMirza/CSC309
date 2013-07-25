<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="content-type" content="text/html; charset=utf-8" />
    <title><?php echo $title; ?></title>
</head>
<body>
    <?php
    // we connect to localhost at port 3310
    $con = mysql_connect('127.0.0.1:3310', 'c3mirzaq', '335719', 'c3mirzaq');
    mysql_select_db('c3mirzaq');
    if (!$con) {
        die('Could not connect: ' . mysql_error());
    }
    
    date_default_timezone_set('UTC');
    $today = date_create("2013-07-21");
    echo date_format($today, "Y-m-d");
    $result = mysql_query("select * from c3mirzaq.flight where DATE(date) = '2013-7-28'");
    // Check result
    // This shows the actual query sent to MySQL and error, good for debugging.
    if (!$result) {
        $message  = 'Invalid query: ' . mysql_error() . "\n";
        die($message);
    }
    $headers = array("Date", "Time", "Available");
    echo "<table>";
    foreach($headers as $header) {
        echo "<th>$header</th>";
    }
    // Use result, one of the mysql result functions must be used
    // See also mysql_result(), mysql_fetch_array(), mysql_fetch_row(), etc.
    while ($row = mysql_fetch_assoc($result)) {
        echo "<tr>";
        echo "<td>" . $row['date'] . "</td><td>" . $row['timetable_id'] . "</td><td>" . $row['available'] . "</td>";
        echo "</tr>";
    }
    echo "</table>";
    ?>
</body>
</html>
