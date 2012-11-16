<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sistema Informático de Captura de la Información de las Boletas de Infraestructura y Servicios Municipales</title>

<SCRIPT type="text/javascript" src="<?php echo Yii::app()->params['pathDir']; ?>js/jquery-1.8.2.min.js"></SCRIPT>
<SCRIPT type="text/javascript" src="<?php echo Yii::app()->params['pathDir']; ?>js/jquery.easing.1.3.js"></SCRIPT>
<script type="text/javascript" src="<?php echo Yii::app()->params['pathDir']; ?>js/sexyalertbox.v1.2.jquery.js"></script>
<link href="<?php echo Yii::app()->params['pathDir']; ?>css/sexyalertbox.css" rel=stylesheet>

<script type="text/javascript">
$(document).ready(function() {
	
	$("#save_btn").click(function() 
	{	
		var formData = {
			username: $("#login_txt").val(),
			password: $("#pass_txt").val()
		};		
		$.ajax({
			type: "POST",
			url: "<?php echo Yii::app()->params['pathDir']; ?>index.php/app/login",
			data: formData,
			success: function(response)
			{
				if(response ==  true)					
					document.location = '<?php echo Yii::app()->params['pathDir']; ?>index.php/app/system';				
				else{
					switch(response){
						case '3':
							Sexy.error('<h1>Mensaje a Usuario</h1><em></em><br/></br><p>La Cuenta del Usuario ya no se encuentra activa . . .</p>');
							$("#login_txt, #pass_txt").val('');									
							return;
						break;
						default:
                            Sexy.error('<h1>Mensaje a Usuario</h1><em></em><br/></br><p>El Usuario no se encuentra registrado en la Base de Datos . . .</p>');
                            $("#login_txt, #pass_txt").val('');
                            return;
                        break;
					}											
				}
			}
		});		
		return false;
	});
	
});
</script>
<style>
body{
	margin:0 0 0 0;
	background-color:#535353;
}
@font-face {font-family: 'Cuprum'; src: local("Cuprum"), url("<?php echo Yii::app()->params['pathDir']; ?>font/Cuprum.ttf") format("truetype")}
#header {
	background:url(<?php echo Yii::app()->params['pathDir']; ?>images/barra.jpg);
	height:70px;
    padding:15px;
	font-family: 'Cuprum', 'Lucida Grande', 'Segoe UI', Tahoma, sans-serif;
	font-size:18px;
	color:#FFF;
	text-align:center;
	margin-top:-20px;/*ERROR*/
}
#backlogin{
	background:#E4E4E4 url(<?php echo Yii::app()->params['pathDir']; ?>images/login.png);
	width:525px;
	height:349px;
	position: absolute;
	border-radius: 7px;
	top: 50%;
	left: 50%;
	margin-top: -175px; /* height/2 = 500px / 2 */
	margin-left: -263px; /* width/2 = 500px / 2 */
}
#login{
	width:300px;
	height:130px;
	margin:170px 0 0 160px;
}
#login div{
	float:left;
	font-family: tahoma,arial,verdana,sans-serif;
	font-size:12px;
}
#login .label{
	width:115px;
	text-align:right;
	padding-top:5px;
}
</style>
</head>
<body>
<div id="header"></div>
<div id="backlogin">
	<div id="login">
    	<form enctype="multipart/form-data" id="formSead" name="formSead" action="" method="post">
        	<div class="label">Usuario:</div><input id="login_txt" name="login_txt" type="text" />
            <div class="label">Contraseña:</div><input id="pass_txt" name="pass_txt" type="password" /><br/>
            <div style="float:right; margin-right:26px;">
	            <input id="clear_btn" name="clear_btn" type="button" value="Limpiar" />
    	        <input id="save_btn" name="save_btn" type="button" value="Enviar" />
            </div><br/><br/>
            <div style="float: right;margin-right: 30px;">
           		<img src="<?php echo Yii::app()->params['pathDir']; ?>images/icons/icon_67.png" width="16" height="16" /> ¿Olvidó su contraseña?
            </div>
    	</form>
    </div>	
</div>
</body>
</html>