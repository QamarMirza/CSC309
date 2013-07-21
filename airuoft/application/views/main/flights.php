<?php
echo anchor('','Back') . "<br />";


//And if the $site variable is not empty we echo it's content by using the generate method of the table class / library
if(!empty($flights)) 
	echo $this->table->generate($flights); 

?>

