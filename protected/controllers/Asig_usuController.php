<?php
class Asig_usuController extends Controller
{
    var $widKey = false;
    public function actionCheck_data()
    {

    }
    public function actionSave_data()
    {
        $sql="select * from tbl_asignacion_usuarios au where au.asigu_mun=".$_GET['asigu_mun']." and au.asigu_usu=".$_GET['asigu_usu'];
        $consulta = Yii::app()->db->createCommand($sql)->queryAll();
        if(count($consulta)==0){
            $model = new tbl_asignacion_usuarios();
            $transaction = Yii::app()->db->beginTransaction();
            try{
                $model->attributes = $_GET;
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
                echo "Error system controller 'Asig_usu' in the action -> Add.";
            }
        }
        else
            echo true;
    }

    public function actionDelete_data()
    {
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $sql="delete from tbl_asignacion_usuarios where asigu_id=".$_GET['asigu_id'];
            $model = Yii::app()->db->createCommand($sql)->execute();
            if($model){
                $transaction->commit();
                echo "Eliminado";
            }
        }catch(Exception $e){
            $transaction->rollback();
            echo "Error system controller 'Asig_usu' in the action -> Delete.";
        }
        //$transaction = Yii::app()->db->beginTransaction();
    }
}