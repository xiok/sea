<?php
require_once('/../../librarys/fpdf.php');

class MetadatosReport extends FPDF{
    public function Header()
    {        
        $this->Image('images/logomin.png',100,8);
        $this->SetFont('Arial','B',15);        
        $this->Ln(22);
        $this->Cell(60);
        $this->Cell(30,10,'Observaciones por Pregunta de Boleta',0,1);
        $this->SetFont('Arial','B',11);
        $this->Cell(40,7, 'Boleta:',0,4);
        //$this->Ln(10);
        $this->Cell(41,7, 'Codigo',1);
        $this->Cell(100,7, 'Pregunta',1,0,'C');
        $this->Cell(55,7, 'Descripcion',1,0,'C');
        $this->Ln(7);
        //$this->Cell(40,7, 'Usuario',1,1,'C');
    }    
    public function Footer()
    {        
        $this->SetY(-15);        
        $this->SetFont('Arial','I',8);        
        $this->Cell(0,0,'',1,1);
        $this->Cell(0,10,'Usuario: '.Yii::app()->session['login'],0,0);
        $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'R');
    }
}
?>