class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.integer :barbecue_id
      t.integer	:user_id
      t.string :bringing
      t.timestamps null: false
    end
  end
end
