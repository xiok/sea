<?php

/**
 * This is the model class for table "tbl_accesos".
 *
 * The followings are the available columns in table 'tbl_accesos':
 * @property integer $acc_id
 * @property string $acc_fecha
 * @property string $acc_hora
 * @property string $acc_usuario
 * @property string $acc_rol
 * @property string $acc_ip
 * @property string $acc_pais
 * @property string $acc_localidad
 */
class tbl_accesos extends CActiveRecord
{
	/**
	 * Returns the static model of the specified AR class.
	 * @return tbl_accesos the static model class
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
		return 'tbl_accesos';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('acc_id, acc_fecha, acc_hora, acc_usuario, acc_rol, acc_ip, acc_pais, acc_localidad', 'required'),
			array('acc_id', 'numerical', 'integerOnly'=>true),
			array('acc_usuario, acc_rol', 'length', 'max'=>4),
			array('acc_ip', 'length', 'max'=>16),
			array('acc_pais, acc_localidad', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('acc_id, acc_fecha, acc_hora, acc_usuario, acc_rol, acc_ip, acc_pais, acc_localidad', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.		
        return array(
            'user'=>array(self::BELONGS_TO, 'tbl_usuarios', array('acc_usuario'=>'usu_codigo')),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'acc_id' => 'Acc',
			'acc_fecha' => 'Acc Fecha',
			'acc_hora' => 'Acc Hora',
			'acc_usuario' => 'Acc Usuario',
			'acc_rol' => 'Acc Rol',
			'acc_ip' => 'Acc Ip',
			'acc_pais' => 'Acc Pais',
			'acc_localidad' => 'Acc Localidad',
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

		$criteria->compare('acc_id',$this->acc_id);

		$criteria->compare('acc_fecha',$this->acc_fecha,true);

		$criteria->compare('acc_hora',$this->acc_hora,true);

		$criteria->compare('acc_usuario',$this->acc_usuario,true);

		$criteria->compare('acc_rol',$this->acc_rol,true);

		$criteria->compare('acc_ip',$this->acc_ip,true);

		$criteria->compare('acc_pais',$this->acc_pais,true);

		$criteria->compare('acc_localidad',$this->acc_localidad,true);

		return new CActiveDataProvider('tbl_accesos', array(
			'criteria'=>$criteria,
		));
	}
}