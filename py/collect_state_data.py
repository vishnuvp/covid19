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

df = pd.read_html('https://www.mohfw.gov.in/')
df1 = pd.DataFrame(df[0])
states = list(df1['Name of State / UT'][:-1])
df1['confirmed'] = df1['Total Confirmed cases (Indian National)'] + df1['Total Confirmed cases ( Foreign National )']
series_lambda = lambda n,d: {"type": "column","name": n, "data": d}

jsonData = {"categories": states, "series":[series_lambda("Confirmed", list(df1['confirmed'][:-1])),
                                       series_lambda("Cured", list(df1['Cured/Discharged/Migrated'][:-1])),
                                       series_lambda("Death", list(df1['Death'][:-1]))
                                       ]}
with open('covid19-india.json', 'w') as fp:
    json.dump(jsonData, fp, cls=NpEncoder)