<?php
class AsignacionController extends Controller
{   var $widKey = false;
    public function actionGrid_data()
    {
        $sql=  "SELECT b.bol_codigo,b.bol_codigosea,a.asig_fechaini,a.asig_fechafin,m.mun_detalle
                FROM tbl_boleta b,tbl_asignacion a,tbl_municipio m
                WHERE a.asig_bole=b.bol_id and m.mun_id=a.asig_mun ";
        for($i=0;$i<count($_GET);$i++){
            $p="mun".$i;
            if($i==0)
                $sql=$sql." and(a.asig_mun=".$_GET[$p];
            else{
                if($i==(count($_GET)-1))
                    $sql=$sql." or a.asig_mun=".$_GET[$p].")";
                else
                    $sql=$sql." or a.asig_mun=".$_GET[$p];
            }
        }
        if(count($_GET)==1)
            $sql=$sql.")";

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
                $value['mun_detalle']
            ));
        }
        $allData = array('rows'=>$data);
        echo 'data = '.CJSON::encode($allData);        
	}
    public function actionSave_data()
    {                              
        $model = new tbl_asignacion();
        $transaction = Yii::app()->db->beginTransaction();
        try{
            $model->attributes = $_POST;
            $this->widKey = $model->save();                        
            if($this->widKey){                                
                $transaction->commit();
                echo "GUARDADO";
            }                   
        }catch(Exception $e){
            $this->widKey = false;                     
        }                
        if(!$this->widKey){
            $transaction->rollback();
            echo "Error system controller 'Asignacion' in the action -> Add.".count($_POST);
        }               	
    }
}
