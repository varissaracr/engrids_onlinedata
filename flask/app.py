from flask import Flask, redirect, url_for, request
from flask_cors import CORS, cross_origin
import json
import os
import shutil
import psycopg2 as pg2

from auth import conn

host = conn["Host"]
db = conn["Name"]
username = conn["User"]
password = conn["Pass"]
port = conn["Port"]
pg = pg2.connect(database=db, user=username,
                 password=password, host=host, port=port)
pg.autocommit = True
cursor = pg.cursor()

app = Flask(__name__)
CORS(app, support_credentials=True)

# def shp2psql(shpname, shpzip):
#     path = "/app/uploads/"
#     zip = os.path.join(path, shpzip)
#     dir = os.path.join(path, shpname)
#     shutil.unpack_archive(zip, dir)

#     files = os.listdir(dir)
#     for f in files:
#         if f.endswith(".shp"):
#             cmd = f'ogr2ogr -f "PostgreSQL" "PG:host={host} port={port} user={username} dbname={db} password={password}" "{dir}{f}" -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -nlt PROMOTE_TO_MULTI -nln new_layername -overwrite'
#             # os.system(cmd)
#             print(cmd, flush=True)
#     return "da"


@app.route('/')
@cross_origin()
def hello():
    # a = extract()
    return json.dumps({"data": "a"})


@app.route('/shp2pgsql/<string:shpname>/<string:shpzip>')
@cross_origin()
def shp2pgsql(shpname, shpzip):
    path = "/app/uploads/"

    zip = os.path.join(path, shpzip)
    dir = os.path.join(path, shpname)
    shutil.unpack_archive(zip, dir)
    print(zip, flush=True)
    print(dir, flush=True)
    files = os.listdir(dir)
    for f in files:
        print(f, flush=True)
        if f.endswith(".shp"):
            cmd = f'ogr2ogr -f "PostgreSQL" "PG:host={host} port={port} user={username} dbname={db} password={password}" "{dir}/{f}" -lco GEOMETRY_NAME=geom -lco FID=gid -lco SPATIAL_INDEX=GIST -lco precision=NO -nln {shpname} -overwrite'
            os.system(cmd)
            print(cmd, flush=True)

    shutil.rmtree(dir)
    os.remove(zip)
    return json.dumps({"data": "insert ok"})


@app.route('/getpixelvalue/<string:index>/<string:yyyymmdd>/<float:latitude>/<float:longitude>')
@cross_origin()
def getPixelValue(index, yyyymmdd, latitude, longitude):
    f = f'./{index}_clip/_{yyyymmdd}_500m_32647_{index}_clip.tif'
    res = os.popen(
        f'gdallocationinfo -valonly -wgs84 {f} {longitude} {latitude}').read()

    return json.dumps({'index': index, 'val': res})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=3100, debug=True)
