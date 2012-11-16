<?php 
	error_reporting(E_ALL ^ E_NOTICE);
	header("Content-type: text/xml");
	$res=mysql_connect("localhost","root","");
	mysql_select_db("sea2");
	$result1=mysql_query("select * from tbl_departamento order by dep_codigo desc",$res);
	echo("<?xml version='1.0' encoding='ISO-8859-1'?>");
	echo "<tree id='0'>";
		echo "<item id='Dep1' text='Departamentos'>";
		while ($row1 = mysql_fetch_row($result1)){
			echo "<item id='D".$row1[0]."' text='".$row1[2]."'>";
				$result2=mysql_query("select * from tbl_municipio order by mun_dpto desc",$res);
					while ($row2 = mysql_fetch_row($result2)){
						if ($row1[1]==$row2[1]){ 
							echo "<item text='".$row2[3]."' id='M".$row2[0]."'>";							
							echo "</item>";		
						}
					}
			echo "</item>";		
		}	
		echo "</item>";
	echo "</tree>";
?>