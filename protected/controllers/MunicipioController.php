<?php
class MunicipioController extends Controller
{
    var $widKey = false;
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;
        $aux = tbl_municipio::model()->findAll('mun_estado=:keyEst', array(':keyEst'=>0));
        foreach($aux as $value){            
            $cont++;            
            $data[] = array('id'=>$cont,'data'=>array(
                $value->mun_id, 
                $value->mun_codigo, 
                $value->mun_detalle, 
                $value->dpto->dep_detalle,
                $value->dpto->dep_codigo
            ));                        
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);   
	}
    public function actionGrid_usu()
    {
        $data = Array();
        $cont = 0;
        $aux = tbl_municipio::model()->findAll('mun_estado=:keyEst', array(':keyEst'=>0));
        foreach($aux as $value){
            $cont++;
            $data[] = array('id'=>$cont,'data'=>array(
                $value->mun_id, $value->mun_detalle, $value->dpto->dep_detalle, '0'
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }
    /* PARA EL GRID NRO 2 */
    public function actionGrid_asig()
    {
        $data = Array();
        $cont = 0;
        $sql="select m.mun_id,m.mun_detalle,d.dep_codigo,au.asigu_id ";
        $sql.="from tbl_asignacion_usuarios au, tbl_municipio m,tbl_departamento d ";
        $sql.="where au.asigu_usu=".$_GET['usu_id']." and au.asigu_mun=m.mun_id and m.mun_dpto=d.dep_codigo";
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        foreach($model as $value){
            $cont++;
            $data[] = array('id'=>$cont,'data'=>array(
                $value['mun_id'],
                $value['mun_detalle'],
                $value['dep_codigo'],
                $value['asigu_id'],
                '1'
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
    }

    public function actionSave_data()
    {                       	                        
        $model = new tbl_municipio;        
        $transaction = Yii::app()->db->beginTransaction();                
        try{
            $model->attributes = $_POST;
            $model->mun_estado = 0;
            $this->widKey = $model->save();                        
            if($this->widKey){                                
                $transaction->commit();
                $dptoDetail = tbl_municipio::model()->find("mun_dpto=:keyDpto", array(':keyDpto'=>$model->mun_dpto));                        
                $data = $model->primaryKey.'-'.$dptoDetail->dpto->dep_detalle;            
                echo $data;    
            }
        }catch(Exception $e){
            $this->widKey = false;                     
        }
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Municipio' in the action -> Add.";
        }
    }
    public function actionEdit_data()
    {        
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_municipio::model()->find("mun_id=:keyId", array(':keyId'=>$_GET['id']));
            $model->attributes = $_POST;            
            $this->widKey = $model->save();
            if($this->widKey){                                
                $transaction->commit();
                echo '1-'.$model->dpto->dep_detalle;    
            }
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Municipio' in the action -> Edit.";
        }         
    }
    public function actionErase_data()
    {                
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_municipio::model()->find("mun_id=:keyId", array(':keyId'=>$_GET['id']));
            $model->mun_estado = 1;      
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
            echo "Error system controller 'Municipio' in the action -> Erase.";
        }        
    }
}

