<?php
require('/../../librarys/fpdf.php');

class UsuariosReport extends FPDF{    
    public function Header()
    {        
        $this->Image('images/logomin.png',100,8);        
        $this->SetFont('Arial','B',15);        
        $this->Ln(22);
        $this->Line(100,42,100,52);
        $this->Line(180,42,180,52);
        $this->Cell(76);
        $this->Cell(30,10,'Reporte de Usuarios',0,1);
        $this->SetFont('Arial','B',12);        
        $this->Cell(0,10,'',1,1);
        $this->Text(34, 48.5, 'Datos Personales');
        $this->Text(120, 48.5, 'Correo Electronico');
        $this->Text(187, 48.5, 'Login');                
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