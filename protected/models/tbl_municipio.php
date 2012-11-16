<?php

/**
 * This is the model class for table "tbl_municipio".
 *
 * The followings are the available columns in table 'tbl_municipio':
 * @property integer $mun_id
 * @property string $mun_dpto
 * @property string $mun_codigo
 * @property string $mun_detalle
 * @property integer $mun_estado
 */
class tbl_municipio extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_municipio the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbl_municipio';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('mun_dpto, mun_codigo, mun_detalle, mun_estado', 'required'),
			array('mun_estado', 'numerical', 'integerOnly'=>true),
			array('mun_dpto, mun_codigo', 'length', 'max'=>4),
			array('mun_detalle', 'length', 'max'=>30),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('mun_id, mun_dpto, mun_codigo, mun_detalle, mun_estado', 'safe', 'on'=>'search'),
		);
	}
    public function primaryKey(){
        return array('mun_id','mun_dpto');
    }
	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
            'dpto'=>array(self::BELONGS_TO, 'tbl_departamento', array('mun_dpto'=>'dep_codigo')),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'mun_id' => 'Mun',
			'mun_dpto' => 'Mun Dpto',
			'mun_codigo' => 'Mun Codigo',
			'mun_detalle' => 'Mun Detalle',
			'mun_estado' => 'Mun Estado',
		);
	}    
	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('mun_id',$this->mun_id);

		$criteria->compare('mun_dpto',$this->mun_dpto,true);

		$criteria->compare('mun_codigo',$this->mun_codigo,true);

		$criteria->compare('mun_detalle',$this->mun_detalle,true);

		$criteria->compare('mun_estado',$this->mun_estado);

		return new CActiveDataProvider('tbl_municipio', array(
			'criteria'=>$criteria,
		));
	}
}