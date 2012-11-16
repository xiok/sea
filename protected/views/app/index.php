<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Sistema Informatico de Captura de Información de Boletas</title>
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params['pathDir']; ?>dhtmlx/dhtmlx.css">
<!--<link rel="stylesheet" type="text/css" href="dhtmlx2/dhtmlxForm/codebase/skins/dhtmlxform_dhx_terrace.css">-->
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params['pathDir']; ?>css/dhtmlx_custom.css">

<script src="<?php echo Yii::app()->params['pathDir']; ?>dhtmlx/dhtmlx.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir'].'./../'; ?>dhtmlx/dhtmlxTreeGrid/sources/ext/dhtmlxtreegrid_property.js" type="text/javascript" charset="utf-8"></script>
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params['pathDir'].'./../'; ?>dhtmlx/dhtmlxTreeGrid/sources/ext/dhtmlxtreegrid_property.css">

<!--
<script src="<?php echo Yii::app()->params['pathDir']; ?>dhtmlx/dhtmlxForm/codebase/ext/dhtmlxform_item_container.js" type="text/javascript" charset="utf-8"></script>
<script  src="<?php echo Yii::app()->params['pathDir']; ?>dhtmlx/dhtmlxTree/codebase/dhtmlxtree.js"></script>
-->
<link rel="stylesheet" type="text/css" href="<?php echo Yii::app()->params['pathDir']; ?>css/style.css">
</head>
<body>
<div id="header">
	<div class="fontHeader">Sistema Informático de Captura de la Información de Boletas</div>
</div>
<div id="mainView" style="position:relative; margin:0 0 0 7px; padding-left:3px;  width: 98.6%; height: 90.3%; border: #B5CDE4 1px solid;"></div>
<div id="cpanel">
    <div class="icon-wrapper">
        <div class="icon">
            <a href="/j/administrator/index.php?option=com_content&amp;task=article.add">
                <img src="<?php echo Yii::app()->params['pathDir']; ?>images/icons48/boleta.png" alt="">
                <span>Diseñar</span>
            </a>
        </div>
    </div>
    <div style="float:left;"><img src="<?php echo Yii::app()->params['pathDir']; ?>images/spacer.png" alt="" width="9"></div>
    <div class="icon-wrapper">
        <div class="icon">
            <a href="/j/administrator/index.php?option=com_content&amp;task=article.add">
                <img src="<?php echo Yii::app()->params['pathDir']; ?>images/icons48/edit.png" alt="">
                <span>Transcribir</span>
            </a>
        </div>
    </div>        
    <div class="icon-wrapper">
        <div class="icon">
            <a href="/j/administrator/index.php?option=com_content&amp;task=article.add">
                <img src="<?php echo Yii::app()->params['pathDir']; ?>images/icons48/themes.png" alt="">
                <span>Municipio</span>
            </a>
        </div>
    </div>
    <div style="float:left;"><img src="<?php echo Yii::app()->params['pathDir']; ?>images/spacer.png" alt="" width="9"></div>
    <div class="icon-wrapper">
        <div class="icon">
            <a href="/j/administrator/index.php?option=com_content&amp;task=article.add">
                <img src="<?php echo Yii::app()->params['pathDir']; ?>images/icons48/user.png" alt="">
                <span>Usuario</span>
            </a>
        </div>
    </div>
</div>
<div id="logoMain"></div>
<div id="detailMain">
	<div id="details">
	Cuando usted seleccione un enlace o ítem, aquí se podrá ver un pequeño detalle de la misma.
    </div>
</div>
<br />
<div id="detailDpto">
	<div id="details">
    <span><strong>DEPARTAMENTOS</strong></span><br /><br />
	Este el formulario donde se podra Adicionar, Editar y Elimnar codigos y nombres de todos los departamentos de Bolivia.
    </div>
</div>
<div id="detailCons">
	<div id="details">
    <span><strong>CONSISTENCIA</strong></span><br /><br />
	Este el formulario donde se podra ver y sacar el reporte de consistencia de Bolivia.
    </div>
</div>
<div id="detailAsigUser">
	<div id="details">
    <span><strong>Asignar Municipio</strong></span><br /><br />
	Este el formulario donde se podra asignar Municipios a los Usuarios.
    </div>
</div>
<div id="detailMetadatos">
    <div id="details">
        <span><strong>Metadatos</strong></span><br /><br />
        Este el formulario es donde se catalogaran e identificaran los datos para las preguntas,de
        forma comparable para las diferentes boletas.
    </div>
</div>
<script>	
	var mainPath = '<?php echo Yii::app()->params['pathDir']; ?>';
	var getUser = "<?php echo (string)Yii::app()->request->cookies['userLogin']; ?>";
	var idUsuario = "<?php echo (string)Yii::app()->request->cookies['userId']; ?>";
	var getAcces = "<?php echo (string)Yii::app()->request->cookies['userAccess']; ?>";
	var getBandera = "<?php echo (string)Yii::app()->request->cookies['userBandera']; ?>";
</script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/index.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/menu.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/gestion.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/departamento.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/municipio.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/roles.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/usuarios.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/fechas.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/disenadorwin.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/disenador.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/mensajes.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/envio.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/generador.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/stepcons1.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/stepcons2.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/metadatos.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/asigbol.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/metaUpdate.js" type="text/javascript" charset="utf-8"></script>
<script src="<?php echo Yii::app()->params['pathDir']; ?>widgets/asigUser.js" type="text/javascript" charset="utf-8"></script>
</body>
</html>