<?php
echo anchor('','Back') . "<br />";

if (isset($errno)){
	echo "<p> DB: Error: ($errno) $errmsg</p>";
}

//And if the $site variable is not empty we echo it's content by using the generate method of the table class / library
if(!empty($flights)) 
	echo $this->table->generate($flights); 
?>

