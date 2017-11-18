using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Utility
{
   public class MapXYConvent
    {
        public  string WGS84ToCGCS2000(string WGS84)
        {
            if (string.IsNullOrEmpty(WGS84))
            {
                return "";
            }
            string output = string.Empty;
            string[] Lonlats = WGS84.Split(';');
            for (int i = 0; i < Lonlats.Length; i++)
            {
                string str = Lonlats[i];
                if (string.IsNullOrEmpty(str))
                {
                    continue;
                }

                string[] Lonlat = Lonlats[i].Split(',');
               
                double Lon = Convert.ToDouble(Lonlat[0]);
                double Lat = Convert.ToDouble(Lonlat[1]);
                TransCoords.Trans trans = new TransCoords.Trans(0);
                double[] xy = trans.doTrans(Lon, Lat);
                double x = xy[0];
                double y = xy[1];
                if (i != 0)
                {
                    output += ";";
                }
                output += x.ToString() + "," + y.ToString();
            }
            return output;
        }

        static bool isRestart = false;

        /// <summary>
        /// WS84轨迹纠偏
        /// </summary>
        /// <param name="pointList">点集合</param>
        /// <param name="distance">纠偏两点相差距离/米</param>
        /// <returns></returns>
        public  string OrbitCorrection(List<Point> pointList, double distance)
        {
            // List<Point> currentPointList = new List<Point>();
            string str_Point = string.Empty;
            int count = pointList.Count();

            for (int i = 0; i < count; i++)
            {
                if (i == 0 || i == count - 1)
                {
                    // currentPointList.Add(pointList[i]);
                    str_Point += pointList[i].X + "," + pointList[i].Y + ";";
                    continue;
                }

                if (isRestart == false)
                {
                    double abDistance = GetDistance(pointList[i], pointList[i - 1]);
                    double acDistance = GetDistance(pointList[i], pointList[i + 1]);
                    //double bcDistance = GetDistance(pointList[i-1], pointList[i + 1]);
                    if (abDistance <= distance)
                        str_Point += pointList[i].X + "," + pointList[i].Y + ";";
                    else if (acDistance <= distance)
                        str_Point += pointList[i].X + "," + pointList[i].Y + ";";
                    else
                        isRestart = true;
                }
                else
                {
                    str_Point += pointList[i].X + "," + pointList[i].Y + ";";
                    isRestart = false;
                }

            }

            return str_Point;
        }

        /// <summary>
        /// 计算两点之间距离
        /// </summary>
        /// <param name="start"></param>
        /// <param name="end"></param>
        /// <returns>米</returns>
        public  double GetDistance(Point start, Point end)
        {
            double lat1 = (Math.PI / 180) * start.X;
            double lat2 = (Math.PI / 180) * end.X;
            double lon1 = (Math.PI / 180) * start.Y;
            double lon2 = (Math.PI / 180) * end.Y;

            //地球半径
            double R = 6378.137;
            // double R = 6371.00877138;

            //两点间距离 km，如果想要米的话，结果*1000就可以了
            double d = Math.Acos(Math.Sin(lat1) * Math.Sin(lat2) + Math.Cos(lat1) * Math.Cos(lat2) * Math.Cos(lon2 - lon1)) * R;

            return d * 1000;
        }
    }
}
