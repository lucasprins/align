using Align.Services;

namespace Tests.Services
{
    public class ValidationServiceTests
    {
        private readonly ValidationService _validationService;

        public ValidationServiceTests()
        {
            _validationService = new ValidationService();
        }

        [Theory]
        [InlineData("abc-def-ghi", true)]
        [InlineData("abc_def_ghi", false)]
        [InlineData("12345", false)]
        [InlineData("-abc-", false)]
        [InlineData("-abc-def", false)]
        [InlineData("abc-def-", false)]
        [InlineData("ab", false)]
        [InlineData("---------------", false)]
        public void ValidateWorkspaceUrl_ShouldReturnExpectedResult(string url, bool expected)
        {
            var result = _validationService.ValidateWorkspaceUrl(url);

            Assert.Equal(expected, result);
        }
    }
}
