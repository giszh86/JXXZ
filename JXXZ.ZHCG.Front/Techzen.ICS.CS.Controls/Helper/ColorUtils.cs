using System;
using System.Net;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Documents;
using System.Windows.Ink;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Animation;
using System.Windows.Shapes;

namespace Techzen.ICS.CS.Controls.Helper
{
    public class ColorUtils
    {
        /// <summary>
        /// 颜色转换工具，将string转换为Color。可以选择是否添加alpha值。字符串不包含“#”。
        /// </summary>
        /// <param name="colorCode"></param>
        /// <returns></returns>
        public static Color ConvertColorCodeToColor(string colorCode)
        {
            Color c = new Color();
            if (colorCode.Length == 8)
            {
                c.A = (byte)Convert.ToInt32("0x" + colorCode.Substring(0, 2), 16);
                c.R = (byte)Convert.ToInt32("0x" + colorCode.Substring(2, 2), 16);
                c.G = (byte)Convert.ToInt32("0x" + colorCode.Substring(4, 2), 16);
                c.B = (byte)Convert.ToInt32("0x" + colorCode.Substring(6, 2), 16);
            }
            else if (colorCode.Length == 6)
            {
                c.A = 255;
                c.R = (byte)Convert.ToInt32("0x" + colorCode.Substring(0, 2), 16);
                c.G = (byte)Convert.ToInt32("0x" + colorCode.Substring(2, 2), 16);
                c.B = (byte)Convert.ToInt32("0x" + colorCode.Substring(4, 2), 16);
            }
            else
            {
                c.A = 255;
                c.R = 255;
                c.G = 255;
                c.B = 255;
            }

            return c;
        }
    }
}
