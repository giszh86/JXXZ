using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;

namespace Techzen.ICS.CS.Controls
{
    [TemplatePart(Name = CHANGE_PASSWORD_TEXT_BLOCK, Type = typeof(TextBlock))]
    [TemplatePart(Name = LOGOOUT_TEXT_BLOCK, Type = typeof(TextBlock))]
    public class TZWelcome : Control
    {
        private const string CHANGE_PASSWORD_TEXT_BLOCK = "ChangePasswordTextBlock";
        private const string LOGOOUT_TEXT_BLOCK = "LogoutTextBlock";

        private TextBlock _changePasswordTextBlock;
        private TextBlock _logoutTextBlock;

        public static readonly DependencyProperty UsernameProperty =
            DependencyProperty.Register("UserName", typeof(string), typeof(TZWelcome), null);

        public static readonly DependencyProperty UsernameVisibilityProperty =
            DependencyProperty.Register("UserNameVisibility", typeof(Visibility), typeof(TZWelcome), new PropertyMetadata(Visibility.Visible));

        public static readonly DependencyProperty ChangePasswordVisibilityProperty =
            DependencyProperty.Register("ChangePasswordVisibility", typeof(Visibility), typeof(TZWelcome), new PropertyMetadata(Visibility.Visible));

        public static readonly DependencyProperty LogoutVisibilityProperty =
            DependencyProperty.Register("LogoutVisibility", typeof(Visibility), typeof(TZWelcome), new PropertyMetadata(Visibility.Visible));

        public string Username
        {
            get { return (string)GetValue(UsernameProperty); }
            set { SetValue(UsernameProperty, value); }
        }

        public Visibility UsernameVisibility
        {
            get { return (Visibility)GetValue(UsernameVisibilityProperty); }
            set { SetValue(UsernameVisibilityProperty, value); }
        }

        public Visibility ChangePasswordVisibility
        {
            get { return (Visibility)GetValue(ChangePasswordVisibilityProperty); }
            set { SetValue(ChangePasswordVisibilityProperty, value); }
        }

        public Visibility LogoutVisibility
        {
            get { return (Visibility)GetValue(LogoutVisibilityProperty); }
            set { SetValue(LogoutVisibilityProperty, value); }
        }

        public event MouseButtonEventHandler OnChangingPassword;
        public event MouseButtonEventHandler OnLoggingOut;

        public TZWelcome()
        {
            this.DefaultStyleKey = typeof(TZWelcome);
        }

        public override void OnApplyTemplate()
        {
            base.OnApplyTemplate();

            this._changePasswordTextBlock = base.GetTemplateChild(CHANGE_PASSWORD_TEXT_BLOCK) as TextBlock;

            if (this._changePasswordTextBlock != null)
            {
                this._changePasswordTextBlock.MouseLeftButtonUp += new MouseButtonEventHandler(ChangePasswordTextBlock_MouseLeftButtonUp);
            }

            this._logoutTextBlock = base.GetTemplateChild(LOGOOUT_TEXT_BLOCK) as TextBlock;

            if (this._logoutTextBlock != null)
            {
                this._logoutTextBlock.MouseLeftButtonUp += new MouseButtonEventHandler(LogoutTextBlock_MouseLeftButtonUp);
            }
        }

        private void ChangePasswordTextBlock_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            this.OnChangingPassword?.Invoke(sender, e);
        }


        private void LogoutTextBlock_MouseLeftButtonUp(object sender, MouseButtonEventArgs e)
        {
            this.OnLoggingOut?.Invoke(sender, e);
        }
    }
}
