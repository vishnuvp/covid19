import pandas as pd

df1 = pd.read_csv("https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_19-covid-Confirmed.csv")
df1["Date"] = df1['Province/State']
df1['Date'].fillna(df1['Country/Region'], inplace=True)
df1=df1.drop(['Province/State','Country/Region','Lat','Long'], axis=1)
df1.set_index('Date', inplace=True)
df1 = df1.transpose()
df1 = df1[['India', 'Germany', 'United Arab Emirates', 'Italy', 'Spain', 'Ireland', 'Qatar', 'Saudi Arabia', 'Washington', 'New York', 'California', 'Hubei', 'Iran', 'France', 'Shanghai', 'Korea, South', 'Taiwan*']]
df1.to_csv('covid19-data.csv')