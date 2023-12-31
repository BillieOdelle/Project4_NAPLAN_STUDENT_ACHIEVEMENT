import csv
import json
import pandas as pd
from sqlalchemy import create_engine
import sqlite3
from flask import Flask, request, render_template, jsonify
from sqlalchemy.orm import Session 


data = pd.read_csv('./Resources/Naplan_results.csv')

engine= create_engine('sqlite:///NAPLAN_SQLDB.db')

data.to_sql('naplan',engine,index=False,if_exists= 'replace')

session = Session(engine)


################################################
# Flask Setup
################################################
app = Flask(__name__)


# SQLite database connection
conn = sqlite3.connect('NAPLAN_SQLDB.db', check_same_thread=False)
cursor = conn.cursor()
    

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/api/enrolled_students')
def enrolled_students():
    with open('./Resources/enrolled_students.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/mean_scores')
def mean_scores():
    with open('./Resources/mean_scores.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/mean_scores_by_state')
def mean_scores_by_state():
    with open('./Resources/mean_scores_by_state_and_year.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/api/mean_scores_by_year_level')
def mean_scores_by_year_level():
    with open('./Resources/mean_scores_by_year_level_and_year.json', 'r') as f:
        data = json.load(f)
    return jsonify(data)


@app.route('/api/naplan/')
def get_all_movies():
    query = f'SELECT * FROM naplan LIMIT 100'
    cursor.execute(query)
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    result = [dict(zip(columns, row)) for row in rows]
    return jsonify(result)

# Sorted movies by attribute for index page
@app.route('/api/filter')
def get_data_by_domain():
    yearFilterValue  = request.args.get('yearFilterValue', None)
    domainFilterValue  = request.args.get('domainFilterValue', None)
    stateFilterValue  = request.args.get('stateFilterValue', None)

    query = f'SELECT * FROM naplan'
    cursor.execute(query)
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    result = [dict(zip(columns, row)) for row in rows]
    if yearFilterValue != 'All':
        result = [a for a in result if a['YEAR_LEVEL'] == int(yearFilterValue)]
    if domainFilterValue != 'All':
        result = [a for a in result if a['DOMAIN'] == domainFilterValue]
    if stateFilterValue != 'All':
        result = [a for a in result if a['STATE'] == stateFilterValue]
    result = result[:100] # Get 100 rows only
    return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True)