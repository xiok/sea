<?php
class MensController extends Controller
{    
	var $widKey = false;
    public function actionGrid_data()
    {
		if($_GET['id']==1)
			$sql="select m.* from tbl_mensaje m WHERE m.mens_estado=1 and m.mens_usu=".$_GET['usu']." order by mens_fecha desc";
		else{
			if($_GET['id']==2)
				$sql="select m.* from tbl_mensaje m WHERE m.mens_estado<>1 and m.mens_usu=".$_GET['usu']." order by mens_fecha desc";
			else
				$sql="select m.* from tbl_mensaje m WHERE m.mens_estado<>1 and m.mens_usu_des=".$_GET['usu']." order by mens_fecha,mens_bandera desc";
		}
		$model = Yii::app()->db->createCommand($sql)->queryAll();
        $data = Array();
        $cont = 0;
        foreach($model as $value){
			$cont++;
            $valor="No Leido";
            if($value['mens_bandera']==1)
                $valor="Leido";
            $data[] = array('id'=>$cont,'data'=>array(
				$value['mens_remitente'],
				$value['mens_asunto'],
                $valor,
				$value['mens_fecha'],
				$value['mens_descripcion'],
                $value['mens_id']
			));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);
	}
	
    public function actionSave_data()
    {                                
        $model = new tbl_mensaje;
		$transaction = Yii::app()->db->beginTransaction();
		try{
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
            echo "Error system controller 'Mens' in the action -> Add.";
        }
	}

    public function actionEdit_data()
    {
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model = tbl_mensaje::model()->find("mens_id=:keyId", array(':keyId'=>$_GET['mens_id']));
            $model->mens_bandera = $_GET['mens_bandera'];
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
            echo "Error system controller 'Mens' in the action -> Edit.";
        }
    }
}
