using ESRI.ArcGIS.Client;
using System;
using System.Collections.Generic;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace JXXZ.ZHCG.Front.Helper
{
    public class LayerManager
    {
        /// <summary>
        /// 单点元素图层
        /// </summary>
        public static ElementLayer ElementLayer;

        /// <summary>
        /// 轨迹回放图层
        /// </summary>
        public static GraphicsLayer HistoryLayer;

        /// <summary>
        /// 图形图层
        /// </summary>
        public static GraphicsLayer GraphicsLayer;

        /// <summary>
        /// 将元素对象添加到元素图层
        /// </summary>
        /// <param name="g">添加的对象</param>
        public static void AppendElement(UIElement e)
        {
            if (LayerManager.ElementLayer == null)
            {
                throw new LayerNotFoundException("未找到元素图层。");
            }

            if (e != null && !LayerManager.ElementLayer.Children.Contains(e))
            {

                LayerManager.ElementLayer.Children.Add(e);
            }
        }

        /// <summary>
        /// 删除图层元素
        /// </summary>
        /// <param name="g">添加的对象</param>
        public static void RemoveElement(UIElement e)
        {
            if (LayerManager.ElementLayer == null)
            {
                throw new LayerNotFoundException("未找到元素图层。");
            }

            if (LayerManager.ElementLayer.Children.Contains(e))
            {
                LayerManager.ElementLayer.Children.Remove(e);
            }
        }

        /// <summary>
        /// 将元素对象添加到图像图层
        /// </summary>
        /// <param name="g">添加的对象</param>
        public static void AppendGraphic(Graphic g)
        {
            if (LayerManager.GraphicsLayer == null)
            {
                throw new LayerNotFoundException("未找到图像图层。");
            }
            if (g != null && !LayerManager.GraphicsLayer.Graphics.Contains(g))
            {
                LayerManager.GraphicsLayer.Graphics.Add(g);
            }
        }

        /// <summary>
        /// 清理图层
        /// </summary>
        public static void ClearHistoryLayer()
        {
            if (HistoryLayer != null)
            {
                HistoryLayer.Graphics.Clear();
            }
        }

        public static void Clear()
        {
            if (ElementLayer != null)
                ElementLayer.Children.Clear();
            if (HistoryLayer != null)
                HistoryLayer.Graphics.Clear();
            if (GraphicsLayer != null)
                GraphicsLayer.Graphics.Clear();
        }

        /// <summary>
        /// 将元素对象从图像图层中移除
        /// </summary>
        /// <param name="g">移除的对象</param>
        public void RemoveGraphic(Graphic g)
        {
            if (LayerManager.GraphicsLayer == null)
            {
                throw new LayerNotFoundException("未找到图像图层。");
            }

            if (LayerManager.GraphicsLayer.Graphics.Contains(g))
            {
                LayerManager.GraphicsLayer.Graphics.Remove(g);
            }
        }



    }
}
