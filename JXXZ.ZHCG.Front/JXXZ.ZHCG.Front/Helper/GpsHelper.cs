using ESRI.ArcGIS.Client;
using ESRI.ArcGIS.Client.Geometry;
using System;
using System.Collections.Generic;
using System.Windows;
using System.Linq;
using System.Windows.Media;
using Techzen.ICS.PublicModel;

namespace JXXZ.ZHCG.Front.Helper
{
    public class GpsHelper
    {
        /// <summary>
        /// ī����ת84
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="lon"></param>
        /// <param name="lat"></param>
        public static void MercatorToWGS84(double x, double y, out double lon, out double lat)
        {
            lon = x / 20037508.34 * 180;
            lat = y / 20037508.34 * 180;
            lat = 180 / Math.PI * (2 * Math.Atan(Math.Exp(lat * Math.PI / 180)) - Math.PI / 2);
        }

        #region ��ͼ��Բ
        /// <summary>
        /// ī����360�Ȼ�Բ
        /// </summary>
        /// <param name="radius">�뾶</param>
        /// <param name="centerP">���ĵ�</param>
        /// <param name="color">���ɫ</param>
        /// <returns>����Graphic</returns>
        public static Graphic GetEllipseGraphic(double radius, MapPoint centerP)
        {
            Graphic result = new Graphic();
            List<MapPoint> points = new List<MapPoint>();
            for (double i = 0; i <= 360; i++)
            {
                points.Add(new MapPoint((centerP.X - Math.Cos(Math.PI * i / 180.0) * radius), (centerP.Y - Math.Sin(Math.PI * i / 180.0) * radius)));
            }
            ESRI.ArcGIS.Client.Geometry.PointCollection pCollection = new ESRI.ArcGIS.Client.Geometry.PointCollection(points);
            Polygon g = new Polygon();
            g.Rings.Add(pCollection);
            result.Geometry = g;
            // result.Symbol = Tools.DrawStyleTools.GetEllipseFillSymbol(color);//��������Լ�����Ҫ������ʽ
            RadialGradientBrush bursh = new RadialGradientBrush { GradientOrigin = new Point(0.5, 0.5) };

            bursh.GradientStops.Add(new GradientStop { Color = Color.FromArgb(50, 0x46, 0x73, 0xcc), Offset = 0 });
            bursh.GradientStops.Add(new GradientStop { Color = Color.FromArgb(50, 0x46, 0x73, 0xcc), Offset = 1 });
            result.Symbol = new ESRI.ArcGIS.Client.Symbols.SimpleFillSymbol()
            {
                BorderBrush = new SolidColorBrush(Color.FromArgb(220, 0xad, 0xb9, 0xd2)),
                BorderThickness = 2,
                Fill = bursh
            };
            return result;
        }

        /// <summary>
        /// 84����ϵ��Բ��ע�� 84����ϵ��Ҫ radius��Ҫ����111321
        /// </summary>
        /// <param name="radius"></param>
        /// <param name="centerP"></param>
        /// <returns></returns>
        public static Graphic GetEllipseGraphic84(double radius, MapPoint centerP)
        {
            Graphic result = new Graphic();
            List<MapPoint> points = new List<MapPoint>();
            for (double i = 0; i <= 360; i++)
            {
                points.Add(new MapPoint(Math.Abs((centerP.X - Math.Cos(Math.PI * i / 180.0) * radius)), Math.Abs((centerP.Y - Math.Sin(Math.PI * i / 180.0) * radius))));
            }
            ESRI.ArcGIS.Client.Geometry.PointCollection pCollection = new ESRI.ArcGIS.Client.Geometry.PointCollection(points);
            Polygon g = new Polygon();
            g.Rings.Add(pCollection);
            result.Geometry = g;
            // result.Symbol = Tools.DrawStyleTools.GetEllipseFillSymbol(color);//��������Լ�����Ҫ������ʽ
            RadialGradientBrush bursh = new RadialGradientBrush { GradientOrigin = new Point(0.5, 0.5) };

            bursh.GradientStops.Add(new GradientStop { Color = Color.FromArgb(50, 0x46, 0x73, 0xcc), Offset = 0 });
            bursh.GradientStops.Add(new GradientStop { Color = Color.FromArgb(50, 0x46, 0x73, 0xcc), Offset = 1 });
            result.Symbol = new ESRI.ArcGIS.Client.Symbols.SimpleFillSymbol()
            {
                BorderBrush = new SolidColorBrush(Color.FromArgb(220, 0xad, 0xb9, 0xd2)),
                BorderThickness = 2,
                Fill = bursh
            };
            return result;
        }
        #endregion

        /// <summary>
        /// λ�Ƶ�ͼ-��ʾ��Ļ�����е�
        /// </summary>
        /// <param name="list">��ͼԪ���б�</param>
        /// <returns></returns>
        public static Envelope MapExtent4Road(List<MapElementPoint> list)
        {
            try
            {
                double x1 = (double)list.Min(m => m.X);
                double y1 = (double)list.Min(m => m.Y);
                double x2 = (double)list.Max(m => m.X);
                double y2 = (double)list.Max(m => m.Y);
                return new Envelope(x1, y1, x2, y2);
            }
            catch (Exception)
            {
                return null;
            }
        }
    }
}


