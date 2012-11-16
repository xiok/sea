<?php
class PreguntaController extends Controller
{    
	var $widKey=false;
	public function actionEdit_data()
    {
		 $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_pregunta::model()->find("preg_id=:keyId", array(':keyId'=>$_POST['preg_id']));
            $model->attributes = $_GET;            
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
            echo "Error system controller 'Municipio' in the action -> Edit.";
        }         
	}
}
