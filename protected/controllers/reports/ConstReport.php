<?php
require_once('/../../librarys/fpdf.php');

class ConstReport extends FPDF{
    public function Header()
    {
        $this->Image('images/logomin.png',135,8);

        $this->SetFont('Arial','B',15);
        $this->Ln(22);
        $this->Cell(60);
        $this->Text(120,45,'Reportes de Consistencia');
        $this->SetFont('Arial','B',11);
        //$this->Cell(40,7, ':',0,4);
        $this->Ln(30);
        $this->Cell(20,7, 'Usuario',1);
        $this->Cell(60,7, 'Nombre',1,0,'C');
        $this->Cell(45,7, 'Correo',1,0,'C');
        $this->Cell(30,7, 'Fecha',1,0,'L');
        $this->Cell(30,7, 'Hora',1,0,'L');
        $this->Cell(20,7, 'Codigo',1,0,'C');
        $this->Cell(70,7, 'Valor',1,0,'C');
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