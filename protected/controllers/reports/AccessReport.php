<?php
require_once('/../../librarys/fpdf.php');

class AccessReport extends FPDF{    
    public function Header()
    {        
        $this->Image('images/logomin.png',100,8);        
        $this->SetFont('Arial','B',15);        
        $this->Ln(22);        
        $this->Cell(60);
        $this->Cell(30,10,'Reporte de Accesos al Sistema',0,1);
        $this->SetFont('Arial','B',11);        
        
        $this->Cell(40,7, 'Pais',1,0,'C');
        $this->Cell(41,7, 'Localidad de Ingreso',1);
        $this->Cell(40,7, 'IP de Ingreso',1,0,'C');
        $this->Cell(40,7, 'Hora de Ingreso',1,0,'C');
        $this->Cell(40,7, 'Usuario',1,1,'C');                                
    }    
    public function Footer()
    {        
        $this->SetY(-15);        
        $this->SetFont('Arial','I',8);        
        $this->Cell(0,0,'',1,1);
        $this->Cell(70,10,'Fecha y Hora de Impresión: 10-10-2012 10:55',0,0);        
        $this->Cell(0,10,'Usuario: '.Yii::app()->session['login'],0,0);
        $this->Cell(0,10,'Pagina '.$this->PageNo().'/{nb}',0,0,'R');
    }
}
?>