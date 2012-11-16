<?php
class GestionController extends Controller
{    
    var $widKey = false;
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;                
        $model = tbl_gestion::model()->findAllBySql('SELECT * FROM tbl_gestion WHERE ges_estado=:keyGes ORDER BY ges_gestion DESC',array(':keyGes'=>0));        
        foreach($model as $value){
            $cont++;                                                 
            $data[] = array('id'=>$value->id,'data'=>array(
                $value->id,                                
                $value->ges_gestion,
                $value->ges_status                                     
            ));            
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}    
    public function actionSave_data()
    {                                                
        $model = new tbl_gestion;        
        $transaction = Yii::app()->db->beginTransaction();        
        try{
            $cmd = Yii::app()->db->createCommand();            
            $cmd->update('tbl_gestion', array('ges_status'=>0,'ges_type'=>'r'), 'ges_estado=:keyGes', array(':keyGes'=>0));
                        
            $model->attributes = $_POST;            
            $model->ges_status = 1;
            $model->ges_type = 'rw';
            $model->ges_estado = 0;
            $this->widKey = $model->save();                        
            if($this->widKey){                                
                $transaction->commit();
                echo $model->primaryKey;    
            }          
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Gestión' in the action -> Add.";
        }		
    }
    public function actionEdit_data()
    {                
        $transaction = Yii::app()->db->beginTransaction();
        try{            
            $model = tbl_gestion::model()->find("id=:keyId", array(':keyId'=>$_GET['id']));
            if(!empty($_GET['ges_status'])){
                $cmd = Yii::app()->db->createCommand();            
                $cmd->update('tbl_gestion', array('ges_status'=>0), 'ges_estado=:keyGes', array(':keyGes'=>0));
                $model->attributes = $_GET;
            }
            else
                $model->attributes = $_POST;                                
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
            echo "Error system controller 'Gestión' in the action -> Edit.";
        }
    }
    public function actionErase_data()
    {                
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_gestion::model()->find("id=:keyId", array(':keyId'=>$_GET['id']));
            $model->ges_estado = 1;
            $this->widKey = $model->save();
            if($this->widKey){                
                $this->widKey = true;
                $transaction->commit();
                echo true;    
            }
        }catch(Exception $e){
            $this->widKey = false;                     
        }
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Gestión' in the action -> Erase.";
        }         
    }   
}
