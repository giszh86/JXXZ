using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JXXZ.ZHCG.Model
{
    public class SelectItem
    {
        public SelectItem()
        {
            children = new List<SelectItem>();
        }

        public SelectItem(int value, string text)
            : this()
        {
            this.value = value;
            this.text = text;
        }

        public SelectItem(string value, string text)
            : this()
        {
            int num = 0;
            int.TryParse(value, out num);
            this.value = num;
            this.text = text;
        }

        public string text { get; set; }

        public int value { get; set; }

        public List<SelectItem> children { get; set; }
    }

    public class SelectValue 
    {
        public SelectValue(string value, string text, string type)
        {
            this.value = value;
            this.text = text;
            this.type = type;
            children = new List<SelectValue>();
        }
        public string type { get; set; }
        public string text { get; set; }

        public string value { get; set; }

        public List<SelectValue> children { get; set; }
    }

    public class SelectItems : SelectItem
    {
        public SelectItems(int value, string text, int? parentId)
            : base(value, text)
        {
            this.parentId = parentId;
        }
        public int? parentId { get; set; }
    }

    public class FatherSelectItem : SelectItem
    {
        public FatherSelectItem()
            : base()
        {

        }

        public FatherSelectItem(int value, string text, int childrenValue, string childrenText)
            : this()
        {
            this.value = value;
            this.text = text;
            this.childrenValue = childrenValue;
            this.childrenText = childrenText;

        }

        public int childrenValue { get; set; }
        public string childrenText { get; set; }
    }
}
