<?php
	require_once(dirname(__FILE__)."/../../dhtmlx/connector/db_phpyii.php");
	require_once(dirname(__FILE__)."/../../dhtmlx/connector/combo_connector.php");
class BoletaController extends Controller
{
    var $widKey = false;
	
	public function actionMetaGrid_data()
    {    
		$sql=  "select distinct b.bol_id,b.bol_codigo,b.bol_codigosea,bp.bpa_numparte,p.preg_id,p.preg_codigo,p.preg_detallepregunta,p.preg_observacion
				from tbl_asignacion a,tbl_boleta b,tbl_boleta_parts bp,tbl_pregunta p
				where b.bol_codigo=bp.bpa_boleta and bp.bpa_id=p.preg_bopa and p.preg_bopa_numparte=bp.bpa_numparte and b.bol_codigo='".$_GET['bol_codigo']."' order by bp.bpa_numparte,p.preg_id asc ";
		$model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        foreach($model as $value){
			$cont++;
            $data[] = array('id'=>$cont,'data'=>array(
				$value['bol_codigo'],
				$value['bol_codigosea'],
				"Parte ".$value['bpa_numparte'].": ",
				$value['preg_id'],
                $value['preg_codigo'],
				$value['preg_detallepregunta'],
				$value['preg_observacion']
			));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}

	public function actionCombo_data()
    {
		$data = new ComboConnector(tbl_boleta::model(), "PHPYii");	  	   		
		$data->render_table("-","bol_codigo","bol_codigosea","bol_tipo");
    }

    public function actionAsigGrid_data()
    {
        $sql=  "SELECT b.bol_id,b.bol_codigo,b.bol_codigosea FROM tbl_boleta b";
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        foreach($model as $value){
            $cont++;
            $data[] = array('id'=>$cont,'data'=>array(
                $value['bol_id'],$value['bol_codigo'],$value['bol_codigosea'],'0'
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }
	public function actionMod_data(){
		$cont = 0;		
		$model = tbl_modulos:: model()->findAll('mod_estado=:keyMod', array(':keyMod'=>0));
		$txt = "<complete>";
		foreach($model as $value){
			$txt.='<option value="'.$value->mod_codigo.'">'.$value->mod_detalle.'</option>';			
		}
		header ("content-type: text/xml");
        echo $txt."</complete>";
	}
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;
		$model = tbl_boleta_parts:: model()->findAll('bpa_estado=:keyPar', array(':keyPar'=>0));
        foreach($model as $value){
            $cont++;           
			$data[] = array('id'=>$cont, 'data'=>array(
				$value->bpa_id, 
				$value->bol->bol_codigosea, 
				'Parte '.$value->bpa_numparte, 
				$value->bpa_fecini, 
				$value->bpa_fecfin, 
				empty($value->bpa_script)?'NO':'SI',
				$value->bpa_obs,
				$value->bol->bol_tipo,
				$value->bpa_script
				));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}
    public function actionNew_boleta(){
        
        $modelB = new tbl_boleta;        
        $transaction = Yii::app()->db->beginTransaction();        
		$cmdBol = Yii::app()->db->createCommand();
        try{			
            $con = $cmdBol->select('MAX(bol_id) AS cont')
					   ->from('tbl_boleta')->queryAll();
			is_null($con[0]['cont'])?$codBoleta = 'BOL1':$codBoleta = 'BOLE'.($con[0]['cont']+1);			
            $modelB->bol_codigo = $codBoleta;
			$modelB->bol_codigosea = $_POST['bol_codigo'];
			$modelB->bol_estado_cons = 0;			  
            $modelB->bol_fecha = date('Y-m-d');
			$modelB->bol_usuario = Yii::app()->session['user'];
			$modelB->bol_tipo = $_POST['bol_tipo'];
            $modelB->bol_estado = 0;			
            $this->widKey = $modelB->save();                        
            if($this->widKey){				
				$modelP = new tbl_boleta_parts;	
				$cmdPar = Yii::app()->db->createCommand();			
				$con = $cmdPar->select('MAX(bpa_numparte) AS cont')
						   ->from('tbl_boleta_parts')
						   ->where('bpa_boleta=:keyBol', array(':keyBol'=>'Bol2'))
						   ->queryAll();		   
				is_null($con[0]['cont'])?$bolPart = 1:$bolPart = ($con[0]['cont']+1);						
				$modelP->bpa_codigo = 'BPA'.$bolPart.$codBoleta;
				$modelP->bpa_boleta = $codBoleta;
				$modelP->bpa_numparte = $bolPart;
				$modelP->bpa_fecini = date('Y-m-d');
				$modelP->bpa_fecfin = date('Y-m-d');
				$modelP->bpa_user = Yii::app()->session['user'];
				$modelP->bpa_obs = $_POST['bol_obs'];
				$modelP->bpa_estado = 0;
				$this->widKey = $modelP->save();                        
            	if($this->widKey){					
                	$transaction->commit();
                	echo $modelP->primaryKey["bpa_id"].'#'.date('d-m-Y').'#'.$bolPart.'#'.$_POST['bol_tipo'];
				}				
            }                   
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Boleta' in the action -> Add.";
        }        
    }
	//Desde aqui es para cargar Consistencia

    public function actionConsGrid_data()
    {
        $sql=  "SELECT DISTINCT b.bol_codigo,b.bol_codigosea,a.asig_fechaini,a.asig_fechafin,
                (SELECT COUNT(bp1.bpa_boleta)from tbl_boleta_parts bp1 where bp1.bpa_boleta=b.bol_codigo) as partes
                FROM tbl_boleta b,tbl_boleta_parts bp,tbl_pregunta p,tbl_asignacion a
                WHERE bp.bpa_boleta=b.bol_codigo and p.preg_bopa=bp.bpa_id and a.asig_bole=b.bol_id and a.asig_mun=".$_GET['bole_id'];
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        foreach($model as $value){
            $cont++;
            $data[] = array('id'=>$cont,'data'=>array(
                $value['bol_codigo'],
                $value['bol_codigosea'],
                $value['asig_fechaini'],
                $value['asig_fechafin'],
                $value['partes'],
                '0'
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }
    public function actionConsGrid2_data()
    {
        $sql=  "SELECT p.preg_id,p.preg_orden,p.preg_detallepregunta,bp.bpa_numparte
                from tbl_pregunta p,tbl_boleta_parts bp
                where p.preg_bopa=bp.bpa_id AND bp.bpa_boleta='".$_GET['bol_codigo']."' order by bp.bpa_numparte,p.preg_orden ASC";
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        foreach($model as $value){
            $cont++;
            $data[] = array('id'=>$cont,'data'=>array(
                $value['preg_id'],
                "Preg".$value['preg_orden'],
                $value['preg_detallepregunta'],
                "Parte ".$value['bpa_numparte'].": ",
                '0'
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }
    public function actionConsGrid3_data()
    {
        $sql=  "select p.preg_bopa_numparte,p.preg_codigo, u.usu_login,CONCAT(u.usu_nombres,' ',u.usu_paterno,' ',u.usu_materno)as Nombres,u.usu_email,DATE(r.resp_fecha)as Fecha,TIME(r.resp_fecha)as Hora,r.resp_numero,r.resp_date,r.resp_logico,r.resp_string from tbl_usuarios u,tbl_respuesta r,tbl_pregunta p where u.usu_id=r.resp_usu and r.resp_preg=p.preg_id and r.resp_asig=".$_GET['mun_id'];
        for($i=0;$i<count($_GET)-1;$i++){
            $p="preg_id".$i;
            if($i==0)
                $sql=$sql." and(p.preg_id=".$_GET[$p];
            else{
                if($i==(count($_GET)-2))
                    $sql=$sql." or p.preg_id=".$_GET[$p].")";
                else
                    $sql=$sql." or p.preg_id=".$_GET[$p];
            }
        }
        if(count($_GET)==2)
            $sql=$sql.")";

        //echo $sql;

        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        $respuesta="h";
        foreach($model as $value){
            $cont++;
            if(!empty($value['resp_string']))
                $respuesta=$value['resp_string'];
            else{
                if(!empty($value['resp_date']))
                    $respuesta=$value['resp_date'];
                else{
                    if(!empty($value['resp_numero']))
                        $respuesta=$value['resp_numero'];
                    else
                        $respuesta=$value['resp_logico'];
                }
            }
            $data[] = array('id'=>$cont,'data'=>array(
                $value['usu_login'],
                $value['Nombres'],
                $value['usu_email'],
                $value['Fecha'],
                $value['Hora'],
                "Parte ".$value['preg_bopa_numparte'].": ",
                $value['preg_codigo'],
                $respuesta
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }
}
?>