import yup from '@/utils/yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { DefaultValues, useForm as useReactForm } from 'react-hook-form';

/** Hook */
export const useForm = <T extends Record<string, any>>(schema: Record<string, yup.AnySchema>, defaultValues?: DefaultValues<T> | undefined) => {
  /** Retrieval */
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    trigger,
    ...rest
  } = useReactForm<T>({
    resolver: yupResolver(yup.object(schema).required()) as any,
    defaultValues,
    mode: 'all',
  });

  /** Actions */
  // 语言变化时刷新错误信息
  ahooks.updateEffect(() => {
    trigger();
  }, [t]);

  /** Return */
  return {
    fields: register,
    beforeSubmit: handleSubmit,
    errors,
    control,
    ...rest,
  };
};
