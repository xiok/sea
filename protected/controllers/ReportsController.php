<?php
class ReportsController extends Controller
{
    public function actionAccesos(){        
        require_once('reports/AccessReport.php');        
        $pdf = new AccessReport();
        $pdf->AliasNbPages();
        $pdf->AddPage();        
        $model = tbl_accesos::model()->findAll();
        $aux = '';
        foreach($model as $value){            
            if($aux != $value->acc_fecha){
                $pdf->SetFont('Arial','B',11);
                $pdf->Cell(40,7, 'Fecha: '.implode('-',array_reverse(explode('-',$value->acc_fecha))),0,1);
                $aux = $value->acc_fecha;         
            }            
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(40,7, $value->acc_pais);
            $pdf->Cell(41,7, $value->acc_localidad);
            $pdf->Cell(40,7, $value->acc_ip);
            $pdf->Cell(40,7, $value->acc_hora);
            $pdf->Cell(40,7, $value->user->usu_login,0,1);                
        }                
        $pdf->Output();
    
    }
    public function actionMetadatos(){
        require_once('reports/MetadatosReport.php');
        $pdf = new MetadatosReport();
        $pdf->AliasNbPages();
        $pdf->AddPage();
        $sql=  "select m.mun_codigo,m.mun_detalle,b.bol_id,b.bol_codigo,b.bol_codigosea,bp.bpa_numparte,p.preg_id,p.preg_codigo,p.preg_detallepregunta,p.preg_observacion
				from tbl_municipio m,tbl_asignacion a,tbl_boleta b,tbl_boleta_parts bp,tbl_pregunta p
				where m.mun_id=a.asig_mun and b.bol_id=a.asig_bole
				and b.bol_codigo=bp.bpa_boleta and bp.bpa_id=p.preg_bopa and p.preg_bopa_numparte=bp.bpa_numparte and b.bol_codigo='".$_GET['bol_codigo']."'";
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $aux = '';
        $cont=0;
        foreach($model as $value){
            if($cont==0){
                $pdf->Text(30,46.6, $value['bol_codigosea']);
                $cont=1;
            }
            if($aux != $value['bpa_numparte']){
                $pdf->SetFont('Arial','B',11);
                $pdf->Cell(40,6, 'Parte: '.implode('-',array_reverse(explode('-',$value['bpa_numparte']))),0,1);
                $aux = $value['bpa_numparte'];
            }
            $pdf->SetFont('Arial','',11);
            $pdf->Cell(40,7, $value['preg_codigo'],0,0,'C');
            $pdf->Cell(100,7, $value['preg_detallepregunta']);
            $pdf->MultiCell(55,7, $value['preg_observacion'],0,1);
        }
        $pdf->Output();

    }
    public function actionConsistencia(){
        require_once('reports/ConstReport.php');
        $pdf = new ConstReport("L","mm","A4");
        $pdf->AliasNbPages();
        $pdf->AddPage();

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
        $model = Yii::app()->db->createCommand($sql)->queryAll();
        $aux = '';
        $respuesta="h";
        foreach($model as $value){

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
            if($aux != $value['preg_bopa_numparte']){
                $pdf->SetFont('Arial','B',11);
                $pdf->Cell(40,6, 'Parte: '.implode('-',array_reverse(explode('-',$value['preg_bopa_numparte']))),0,1);
                $aux = $value['preg_bopa_numparte'];
            }
            $pdf->SetFont('Arial','',10);
            $pdf->Cell(20,7, $value['usu_login'],1,0,'C');
            $pdf->Cell(60,7, $value['Nombres'],1,0);
            $pdf->Cell(45,7, $value['usu_email'],1,0);
            $pdf->Cell(30,7, $value['Fecha'],1,0,'L');
            $pdf->Cell(30,7, $value['Hora'],1,0,'L');
            $pdf->Cell(20,7, $value['preg_codigo'],1,0);
            $pdf->MultiCell(70,7, $respuesta,1,1);
        }
        $pdf->Output();

    }
}