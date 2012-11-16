<?php
class UsuariosController extends Controller
{    
    var $widKey = false;
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;
        $model = tbl_usuarios::model()->findAll('usu_estado=:keyEst', array(':keyEst'=>0));
        foreach($model as $value){
            $cont++;
            $value->usu_estado == 0?$estado = 1:$estado = 0;                                     
            $data[] = array('id'=>$cont,'data'=>array(
                $value->usu_id,
                $value->rol->rol_detalle,
                $value->rol->rol_codigo,
                $value->usu_nombres,
                $value->usu_paterno,
                $value->usu_materno,
                $value->usu_nombres.' '.$value->usu_paterno.' '.$value->usu_materno,
                $value->usu_email,
                $value->usu_login,
                '****************'                     
            ));            
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}
	public function actionGrid_mensaje()
    {    
		$sql="select DISTINCT u.usu_id,u.usu_nombres,u.usu_paterno,u.usu_materno from tbl_usuarios u,tbl_asignacion_usuarios au where u.usu_id<>".$_GET['usu_id']." and u.usu_id=au.asigu_usu";
        for($i=0;$i<count($_GET)-1;$i++){
            $p="mun".$i;
            if($i==0)
                $sql=$sql." and(au.asigu_mun=".$_GET[$p];
            else{
                if($i==(count($_GET)-2))
                    $sql=$sql." or au.asigu_mun=".$_GET[$p].")";
                else
                    $sql=$sql." or au.asigu_mun=".$_GET[$p];
            }
        }
        if(count($_GET)==2)
            $sql=$sql.")";

		try{
			$model = Yii::app()->db->createCommand($sql)->queryAll();
			$data = Array();
			$cont = 0;
			foreach($model as $value){
				$cont++;
				$data[] = array('id'=>$cont,'data'=>array(
					$value['usu_id'],
					$value['usu_nombres'].' '.$value['usu_paterno'].' '.$value['usu_materno'],
					'***'
				));
			}
			$allData = array('rows'=>$data);
			echo 'data = '.CJSON::encode($allData);
		}catch(Exception $e){

        }
	}
	public function actionUsu_data()
    {        
        $model = tbl_usuarios::model()->find("usu_id=:keyId", array(':keyId'=>$_GET['id']));        		        	
		$valor = $model->usu_nombres." ".$model->usu_paterno." ".$model->usu_materno;
        echo $valor;
    }
    public function actionSave_data()
    {                                                
        $model = new tbl_usuarios;        
        $transaction = Yii::app()->db->beginTransaction();        
        try{
            $cmd = Yii::app()->db->createCommand();
            $con = $cmd->select('MAX(usu_id) AS cont')->from('tbl_usuarios')->queryAll();            
            $model->attributes = $_POST;            
            $model->usu_codigo = 'USU'.($con[0]['cont'] + 1);
            $model->usu_pass = self::encrypt($_POST['usu_pass']);
            $model->usu_estado = 0;
            $this->widKey = $model->save();                        
            if($this->widKey){                                
                $transaction->commit();
                $rolDetail = tbl_roles::model()->find("rol_codigo=:keyRol", array(':keyRol'=>$_POST['usu_rol']));                        
                $data = $model->primaryKey['usu_id'].'-'.$rolDetail->rol_detalle;            
                echo $data;                    
            }                                                                         
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Usuarios' in the action -> Add.";
        }
    }
    public function actionEdit_data()
    {                
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_usuarios::model()->find("usu_id=:keyId", array(':keyId'=>$_GET['id']));        
    		$model->attributes = $_POST;
            $model->usu_pass = self::encrypt($_POST['usu_pass']);
            $model->usu_estado = '';
    		$this->widKey = $model->save();
            if($this->widKey){                                
                $transaction->commit();
                echo true;    
            }
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Usuarios' in the action -> Edit.";
        }
    }    
    public function actionErase_data()
    {   
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_usuarios::model()->find("usu_id=:keyId", array(':keyId'=>$_GET['id']));
            $model->usu_estado = 1;      
	        $this->widKey = $model->save();
            if($this->widKey){
                $transaction->commit();
            }
        }catch(Exception $e){
            $this->widKey = false;
        }
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Usuarios' in the action -> Erase";
        }
    }
    public function actionPrint_data(){
        require_once('reports/UsuariosReport.php');
        
        $pdf = new UsuariosReport();
        $pdf->AliasNbPages();
        $pdf->AddPage();                        
        $modelRoles = tbl_roles::model()->findAllBySql('SELECT rol_codigo,rol_detalle FROM tbl_roles WHERE rol_estado=:keyGes ORDER BY rol_detalle ASC',array(':keyGes'=>0));
        foreach($modelRoles as $valueRol){
            $pdf->SetFont('Times','B',12);
            $pdf->Cell(0,10,'Rol de Usuario: '.utf8_decode($valueRol->rol_detalle),0,1);            
            $modelUser = tbl_usuarios::model()->findAll("usu_rol=:keyRol AND usu_estado=:keyEst", array(':keyRol'=>$valueRol->rol_codigo,':keyEst'=>0));
            $cont = 0;
            foreach($modelUser as $valueUser){
                $cont++;
                $pdf->SetFont('Times','',12);
                $auxName = array($valueUser->usu_nombres,$valueUser->usu_paterno,$valueUser->usu_materno);
                $allName = implode(' ',$auxName);
                $pdf->Cell(10,7, $cont.'.-',0,0,'R');
                $pdf->Cell(80,7, implode(' ',$auxName));
                $pdf->Cell(80,7, $valueUser->usu_email);
                $pdf->Cell(26,7, $valueUser->usu_login,0,1);
            }                        
        }
        $pdf->Output();
    }
    public function encrypt($txt){
		if(!empty($txt)){
        	$data = mcrypt_encrypt(MCRYPT_RIJNDAEL_128, Yii::app()->params['SYSTEM'], $txt, MCRYPT_MODE_ECB);
			return base64_encode(convert_uuencode($data));
		}
		return;
    }
	public function decrypt($txt){
		if(!empty($txt)){
			$data = convert_uudecode(base64_decode($txt));
			return mcrypt_decrypt(MCRYPT_RIJNDAEL_128, Yii::app()->params['SYSTEM'], $data, MCRYPT_MODE_ECB);
		}
		return;
	}    
}