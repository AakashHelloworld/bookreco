from flask import Flask 
from flask_sqlalchemy import SQLAlchemy 

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///project.db"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET"] = "jwt-secret-text"

db = SQLAlchemy(app)

import routes


if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)
 