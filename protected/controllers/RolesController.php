<?php

class RolesController extends Controller
{    
	var $widKey = false;
    public function actionGrid_data()
    {        
        $data = Array();
        $cont = 0;
        $aux = tbl_roles::model()->findAll('rol_estado=:keyEst', array(':keyEst'=>0));
        foreach($aux as $value){            
            $cont++;            
            $data[] = array('id'=>$cont,'data'=>array(
                $value->rol_id, 
                $value->rol_codigo, 
                $value->rol_detalle, 
                $value->rol_archivo              
            ));                        
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);   
	}
    public function actionCombo_data()
    {
        $model = tbl_roles::model()->findAll('rol_estado=:keyEst', array(':keyEst'=>0));
        $data = '<data><item value="" label="---"/>';
        foreach($model as $value){                                   
            $data.='<item value="'.$value->rol_codigo.'" label="'.$value->rol_detalle.'"/>';                      
        }
        header ("content-type: text/xml");
        echo $data.'</data>';
    }
    public function actionSave_data()
    {             		
        $model = new tbl_roles;        
        $transaction = Yii::app()->db->beginTransaction();
        try{                                    
            $model->attributes = $_POST;            
			$model->rol_estado = 0;			
            $this->widKey = $model->save();
			if($this->widKey){				
            	$transaction->commit();                       
            	echo $model->primaryKey['rol_id'];
			}
        }catch(Exception $e){
            $this->widKey = false;
        }
		if(!$this->widKey){
			$transaction->rollback();
            echo "Error system controller 'Roles' in the action -> Add.";
		}        
    }
    public function actionEdit_data()
    {   $transaction = Yii::app()->db->beginTransaction();
		try{
        	$model = tbl_roles::model()->find("rol_id=:keyId", array(':keyId'=>$_GET['id']));        
			$model->attributes = $_POST;			
			$this->widKey = $model->save();
			if($this->widKey){
				$transaction->commit();
				echo true;
			}
		}catch(Exeption $e){
			$this->widKey = false;
		}
		if(!$this->widKey){
			$transaction->rollback();
            echo "Error system controller 'Roles' in the action -> Edit.";
		}
    }
    public function actionErase_data()
    {   
		$transaction = Yii::app()->db->beginTransaction();
		try{
        	$model = tbl_roles::model()->find("rol_id=:keyId", array(':keyId'=>$_GET['id']));                
        	$model->rol_estado = 1;             
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
            echo "Error system controller 'Roles' in the action -> Erase.";
		}
    }
}
