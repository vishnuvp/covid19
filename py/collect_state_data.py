import pandas as pd
import json

import numpy as np

class NpEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        else:
            return super(NpEncoder, self).default(obj)
def create_json(n,d,s=None):

  jsonData = {"type": "column","name": n, "data": d}
  if s:
    jsonData['stacking'] = s
  return jsonData

df = pd.read_html('https://www.mohfw.gov.in/')
df1 = pd.DataFrame(df[7])
df1 = df1[:-2]
states = list(df1['Name of State / UT'][:-1])
df1['Total Confirmed cases (Indian National)'] = pd.to_numeric(df1['Total Confirmed cases (Indian National)'])
df1['Total Confirmed cases ( Foreign National )'] = pd.to_numeric(df1['Total Confirmed cases ( Foreign National )'])
df1['Cured/Discharged/Migrated'] = pd.to_numeric(df1['Cured/Discharged/Migrated'])
df1['Death'] = pd.to_numeric(df1['Death'])

df1['confirmed'] = df1['Total Confirmed cases (Indian National)'] + df1['Total Confirmed cases ( Foreign National )']

jsonData = {"categories": states, "series":[create_json("Confirmed", list(df1['confirmed'][:-1])),
                                       create_json("Cured", list(df1['Cured/Discharged/Migrated'][:-1]), 'normal'),
                                       create_json("Death", list(df1['Death'][:-1]), 'normal')
                                       ]}
with open('covid19-india.json', 'w') as fp:
    json.dump(jsonData, fp, cls=NpEncoder)