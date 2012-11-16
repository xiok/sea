<?php
class DptoController extends Controller
{   var $widKey = false;
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;
        $model = tbl_departamento::model()->findAll('dep_estado=:keyEst', array(':keyEst'=>0));
        foreach($model as $value){
            $cont++;           
            $data[] = array('id'=>$cont,'data'=>array($value->dep_id,$value->dep_codigo,$value->dep_detalle));            
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}
    public function actionCombo_data()
    {
        $model = tbl_departamento::model()->findAll('dep_estado=:keyEst', array(':keyEst'=>0));
        $data = '<data><item value="" label="---"/>';
        foreach($model as $value){                                   
            $data.='<item value="'.$value->dep_codigo.'" label="'.$value->dep_detalle.'"/>';                      
        }
        header ("content-type: text/xml");
        echo $data.'</data>';
    }
    public function actionSave_data()
    {                              
        $model = new tbl_departamento;        
        $transaction = Yii::app()->db->beginTransaction();
        try{  
            $model->attributes = $_POST;
            $model->dep_estado = 0;
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
            echo "Error system controller 'Dpto' in the action -> Add.";
        }               	
    }
    public function actionEdit_data()
    {        
        $transaction = Yii::app()->db->beginTransaction();
        try{            
            $model = tbl_departamento::model()->find("dep_id=:keyId", array(':keyId'=>$_GET['id']));        
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
            echo "Error system controller 'Dpto' in the action -> Edit.";
        }                       
    }
    public function actionErase_data()
    {           
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_departamento::model()->find("dep_id=:keyId", array(':keyId'=>$_GET['id']));
            $model->dep_estado = 1;
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
            echo "Error system controller 'Dpto' in the action -> Erase.";
        } 
    }
}
