class CreateTodos < ActiveRecord::Migration[6.0]
  def change
    create_table :todos do |t|
      t.string :title, null: false
      t.boolean :complete, null: false, default: false
    end
  end
end
